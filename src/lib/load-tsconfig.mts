/**
 * @file loadTsconfig
 * @module tsconfig-utils/lib/loadTsconfig
 */

import normalizeRelativePaths from '#internal/normalize-relative-paths'
import mergeTsconfig from '#lib/merge-tsconfig'
import readTsconfig from '#lib/read-tsconfig'
import type { ModuleId } from '@flex-development/mlly'
import * as mlly from '@flex-development/mlly'
import type {
  LoadTsconfigOptions,
  ResolvedTsconfig,
  Tsconfig
} from '@flex-development/tsconfig-utils'
import { ksort, omit, shake, trim } from '@flex-development/tutils'

/**
 * Load a tsconfig file.
 *
 * @see {@linkcode ModuleId}
 * @see {@linkcode LoadTsconfigOptions}
 * @see {@linkcode ResolvedTsconfig}
 *
 * @async
 *
 * @this {void}
 *
 * @param {ModuleId} id
 *  Module id of tsconfig file, or path to tsconfig file
 * @param {LoadTsconfigOptions | null | undefined} [options]
 *  Load options
 * @return {Promise<ResolvedTsconfig | null>}
 *  Resolved tsconfig or `null` if tsconfig file is not found
 */
async function loadTsconfig(
  this: void,
  id: ModuleId,
  options?: LoadTsconfigOptions | null | undefined
): Promise<ResolvedTsconfig | null> {
  /**
   * Resolved tsconfig object.
   *
   * @var {ResolvedTsconfig | null} tsconfig
   */
  let resolved: ResolvedTsconfig | null = await readTsconfig(id, options)

  if (resolved !== null) {
    /**
     * List of property paths where the value may be a relative path.
     *
     * @const {Set<string>} relativePaths
     */
    const relativePaths: Set<string> = new Set(options?.relativePaths ?? [
      'compilerOptions.baseUrl',
      'compilerOptions.outDir',
      'compilerOptions.paths.*',
      'compilerOptions.paths.*.*',
      'compilerOptions.rootDir',
      'exclude.*',
      'files.*',
      'include.*'
    ])

    if (
      resolved.tsconfig.extends !== false &&
      resolved.tsconfig.extends !== null &&
      resolved.tsconfig.extends !== undefined
    ) {
      /**
       * Configuration files to inherit from.
       *
       * @const {string[]} bases
       */
      const bases: string[] = [resolved.tsconfig.extends]
        .flat()
        .map(trim)
        .filter(extend => extend.length > 0)

      for (const specifier of bases) {
        /**
         * Resolved base tsconfig.
         *
         * @const {ResolvedTsconfig | null} extend
         */
        const extend: ResolvedTsconfig | null = await loadTsconfig(
          await mlly.resolveModule(specifier, resolved.url, options),
          options
        )

        if (extend) {
          normalizeRelativePaths(
            resolved.url,
            extend.url,
            extend.tsconfig,
            null,
            relativePaths
          )

          /**
           * Tsconfig to inherit from.
           *
           * @const {Tsconfig} base
           */
          const base: Tsconfig = omit(extend.tsconfig, ['references'])

          resolved.tsconfig = mergeTsconfig(base, resolved.tsconfig)
        }
      }

      delete resolved.tsconfig.extends
    }

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

  return null
}

export default loadTsconfig
