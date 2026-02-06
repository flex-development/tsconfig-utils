/**
 * @file readTsconfig
 * @module tsconfig-utils/lib/readTsconfig
 */

import chainOrCall from '#internal/chain-or-call'
import constant from '#internal/constant'
import identity from '#internal/identity'
import isPromise from '#internal/is-promise'
import withTrailingSlash from '#internal/with-trailing-slash'
import {
  canParseUrl,
  cwd as cwdUrl,
  getSource,
  isBareSpecifier,
  isImportsSubpath,
  resolveModule,
  toUrl,
  type FileContent,
  type ModuleId
} from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type { TsconfigJson } from '@flex-development/tsconfig-types'
import type {
  Awaitable,
  ReadTsconfigOptions,
  ResolvedTsconfig
} from '@flex-development/tsconfig-utils'
import { ok } from 'devlop'
import JSON from 'json5'
import stripBom from 'strip-bom'

export default readTsconfig

/**
 * Read a tsconfig file.
 *
 * > 👉 **Note**: Returns a promise if {@linkcode getSource}
 * > or {@linkcode resolveModule} returns a promise.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode ModuleId}
 * @see {@linkcode ReadTsconfigOptions}
 *
 * @template {Awaitable<ResolvedTsconfig | null>} T
 *  The resolved tsconfig
 *
 * @this {void}
 *
 * @param {ModuleId | null | undefined} [id='tsconfig.json']
 *  The module id or specifier of the tsconfig file
 * @param {ReadTsconfigOptions | null | undefined} [options]
 *  Read options
 * @return {Awaitable<ResolvedTsconfig | null>}
 *  The resolved tsconfig, or `null` if tsconfig file is not found
 */
function readTsconfig<T extends Awaitable<ResolvedTsconfig | null>>(
  this: void,
  id?: ModuleId | null | undefined,
  options?: ReadTsconfigOptions | null | undefined
): T

/**
 * Read a tsconfig file.
 *
 * > 👉 **Note**: Returns a promise if {@linkcode getSource}
 * > or {@linkcode resolveModule} returns a promise.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode ModuleId}
 * @see {@linkcode ReadTsconfigOptions}
 *
 * @this {void}
 *
 * @param {ModuleId | null | undefined} [id='tsconfig.json']
 *  The module id or specifier of the tsconfig file
 * @param {ReadTsconfigOptions | null | undefined} [options]
 *  Read options
 * @return {Awaitable<ResolvedTsconfig | null>}
 *  The resolved tsconfig, or `null` if tsconfig file is not found
 */
function readTsconfig(
  this: void,
  id?: ModuleId | null | undefined,
  options?: ReadTsconfigOptions | null | undefined
): Awaitable<ResolvedTsconfig | null> {
  id = String(id || 'tsconfig.json')

  /**
   * The module extensions to probe for.
   *
   * @const {Set<string>} extensions
   */
  const extensions: Set<string> = new Set(['.json', '.jsonc', '.json5'])

  /**
   * The id of the parent module.
   *
   * @const {ModuleId} parent
   */
  const parent: ModuleId = options?.parent ??
    new URL('parent.json', withTrailingSlash(toUrl(options?.cwd ?? cwdUrl())))

  /**
   * The URL of the tsconfig file.
   *
   * @var {Awaitable<URL | null>} url
   */
  let result: Awaitable<URL | null> = null

  // try resolving module id of tsconfig file,
  // retrying as relative specifier if the first resolution attempt fails.
  try {
    result = resolveModule(id, parent, { ...options, extensions })
    if (isPromise(result)) result = result.then(identity, retry)
  } catch {
    result = retry()
    if (!isPromise(result) && !result) return result
  }

  return chainOrCall(result, read, /* swallow resolve error */ constant(null))

  /**
   * @this {void}
   *
   * @param {URL | null | undefined} [url]
   *  The URL of the tsconfig file
   * @return {Awaitable<ResolvedTsconfig | null>}
   *  The resolved tsconfig
   */
  function read(
    this: void,
    url: URL | null | undefined = result as URL
  ): Awaitable<ResolvedTsconfig | null> {
    ok(url, 'expected `url`')
    if (!extensions.has(pathe.extname(url))) return null

    /**
     * The contents of the tsconfig file.
     *
     * @const {Awaitable<FileContent | null | undefined>} source
     */
    const source: Awaitable<FileContent | null | undefined> = getSource(
      url,
      options
    )

    return chainOrCall(source, (contents = source as string) => {
      /**
       * The resolved tsconfig.
       *
       * @const {ResolvedTsconfig} resolved
       */
      const resolved: ResolvedTsconfig = { tsconfig: {}, url }

      // convert buffers to strings.
      if (contents && typeof contents === 'object') {
        contents = new TextDecoder(options?.encoding ?? 'utf8').decode(contents)
      }

      // parse tsconfig file content.
      if (typeof contents === 'string' && (contents = contents.trim())) {
        /**
         * The parsed tsconfig file content.
         *
         * @const {unknown} parsed
         */
        const parsed: unknown = JSON.parse(stripBom(contents))

        if (isTsconfigJson(parsed)) resolved.tsconfig = parsed
      }

      return resolved
    })
  }

  /**
   * @this {void}
   *
   * @return {Awaitable<URL | null>}
   *  The resolved URL
   */
  function retry(this: void): Awaitable<URL | null> {
    ok(typeof id === 'string', 'expected `id` to be a string')

    // try resolving `id` as relative specifier.
    if (
      isBareSpecifier(id) &&
      !isImportsSubpath(id) &&
      !id.startsWith('@') &&
      !canParseUrl(id)
    ) {
      try {
        result = resolveModule('./' + id, parent, { ...options, extensions })
      } catch {
        // swallow synchronous resolution error.
      }
    }

    return result
  }
}

/**
 * @this {void}
 *
 * @param {unknown} value
 *  The thing to check
 * @return {value is TsconfigJson}
 *  `true` if `value` looks like tsconfig, `false` otherwise
 */
function isTsconfigJson(this: void, value: unknown): value is TsconfigJson {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
