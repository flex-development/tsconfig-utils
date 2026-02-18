/**
 * @file loadTsconfig
 * @module tsconfig-utils/lib/loadTsconfig
 */

import normalizeRelativePaths from '#internal/normalize-relative-paths'
import mergeTsconfig from '#lib/merge-tsconfig'
import readTsconfig from '#lib/read-tsconfig'
import type { ModuleId } from '@flex-development/mlly'
import type { Tsconfig } from '@flex-development/tsconfig-types'
import type {
  Awaitable,
  LoadTsconfigOptions,
  ResolvedTsconfig
} from '@flex-development/tsconfig-utils'
import { ksort, omit, shake, trim } from '@flex-development/tutils'
import { isThenable, when } from '@flex-development/when'
import { ok } from 'devlop'

export default loadTsconfig

/**
 * Load a tsconfig file.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode ModuleId}
 * @see {@linkcode LoadTsconfigOptions}
 * @see {@linkcode ResolvedTsconfig}
 *
 * @template {Awaitable<ResolvedTsconfig | null>} T
 *  The resolved tsconfig
 *
 * @this {void}
 *
 * @param {ModuleId | null | undefined} [id='tsconfig.json']
 *  The module id or specifier of the tsconfig file
 * @param {LoadTsconfigOptions | null | undefined} [options]
 *  Load options
 * @return {T}
 *  The resolved tsconfig, or `null` if tsconfig file is not found
 */
function loadTsconfig<T extends Awaitable<ResolvedTsconfig | null>>(
  this: void,
  id?: ModuleId | null | undefined,
  options?: LoadTsconfigOptions | null | undefined
): T

/**
 * Load a tsconfig file.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode ModuleId}
 * @see {@linkcode LoadTsconfigOptions}
 * @see {@linkcode ResolvedTsconfig}
 *
 * @this {void}
 *
 * @param {ModuleId | null | undefined} [id='tsconfig.json']
 *  The module id or specifier of the tsconfig file
 * @param {LoadTsconfigOptions | null | undefined} [options]
 *  Load options
 * @return {Awaitable<ResolvedTsconfig | null>}
 *  The resolved tsconfig, or `null` if tsconfig file is not found
 */
function loadTsconfig(
  this: void,
  id?: ModuleId | null | undefined,
  options?: LoadTsconfigOptions | null | undefined
): Awaitable<ResolvedTsconfig | null> {
  return when(readTsconfig(id, options), resolved => {
    if (resolved === null) return resolved

    /**
     * The list of property paths where the value may be a relative path.
     *
     * @const {Set<string>} relativePaths
     */
    const relativePaths: Set<string> = new Set(options?.relativePaths ?? [
      'compilerOptions.baseUrl',
      'compilerOptions.outDir',
      'compilerOptions.paths.*',
      'compilerOptions.paths.*.*',
      'compilerOptions.rootDir',
      'files.*'
    ])

    // extend configuration files.
    if (
      resolved.tsconfig.extends !== false &&
      resolved.tsconfig.extends !== null &&
      resolved.tsconfig.extends !== undefined
    ) {
      /**
       * The configuration files to inherit from.
       *
       * @const {string[]} bases
       */
      const bases: string[] = [resolved.tsconfig.extends].flat().map(trim)

      /**
       * The promises to resolve.
       *
       * @const {PromiseLike<ResolvedTsconfig | null>[]} promises
       */
      const promises: PromiseLike<ResolvedTsconfig | null>[] = []

      // load base tsconfigs.
      for (const id of bases.filter(Boolean).reverse()) {
        /**
         * The resolved base tsconfig.
         *
         * @var {Awaitable<ResolvedTsconfig | null>} base
         */
        let base: Awaitable<ResolvedTsconfig | null>

        // load the tsconfig to extend,
        // applying any comfigurations it may have extended.
        base = loadTsconfig(id, { ...options, parent: resolved.url })

        // store resolve promise, or extend the base.
        isThenable(base) ? promises.push(base) : extend(base)
      }

      delete resolved.tsconfig.extends

      if (promises.length) {
        return Promise.all(promises).then(bases => {
          for (const base of bases) extend(base)
          return finalize()
        })
      }
    }

    return finalize()

    /**
     * @this {void}
     *
     * @param {ResolvedTsconfig | null} extend
     *  The tsconfig to extend
     * @return {undefined}
     */
    function extend(this: void, extend: ResolvedTsconfig | null): undefined {
      if (extend) {
        ok(resolved, 'expected `resolved` url')

        normalizeRelativePaths(
          resolved.url,
          extend.url,
          extend.tsconfig,
          null,
          relativePaths
        )

        /**
         * The tsconfig to inherit from.
         *
         * @const {Tsconfig} base
         */
        const base: Tsconfig = omit(extend.tsconfig, ['references'])

        resolved.tsconfig = mergeTsconfig(base, resolved.tsconfig)
      }

      return void extend
    }

    /**
     * @this {void}
     *
     * @return {ResolvedTsconfig}
     *  The finalized resolved tsconfig
     */
    function finalize(this: void): ResolvedTsconfig {
      ok(resolved, 'expected `resolved` url')

      normalizeRelativePaths(
        resolved.url,
        resolved.url,
        resolved.tsconfig,
        null,
        relativePaths
      )

      return {
        tsconfig: ksort(shake(resolved.tsconfig), { deep: true }),
        url: resolved.url
      }
    }
  })
}
