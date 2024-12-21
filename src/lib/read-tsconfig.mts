/**
 * @file readTsconfig
 * @module tsconfig-utils/lib/readTsconfig
 */

import withTrailingSlash from '#internal/with-trailing-slash'
import {
  cwd as cwdUrl,
  getSource,
  moduleResolve,
  toUrl,
  type ModuleId
} from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type { Tsconfig } from '@flex-development/tsconfig-types'
import type {
  ReadTsconfigOptions,
  ResolvedTsconfig
} from '@flex-development/tsconfig-utils'
import { isObjectCurly } from '@flex-development/tutils'
import JSON from 'json5'
import stripBom from 'strip-bom'

/**
 * Resolve and read a tsconfig file.
 *
 * @see {@linkcode ModuleId}
 * @see {@linkcode ReadTsconfigOptions}
 * @see {@linkcode Tsconfig}
 *
 * @async
 *
 * @this {void}
 *
 * @param {ModuleId} id
 *  Module id of tsconfig file, or path to tsconfig file
 * @param {ReadTsconfigOptions | null | undefined} [options]
 *  Read options
 * @return {Promise<ResolvedTsconfig | null>}
 *  Resolved tsconfig or `null` if tsconfig file is not found
 */
async function readTsconfig(
  this: void,
  id: ModuleId,
  options?: ReadTsconfigOptions | null | undefined
): Promise<ResolvedTsconfig | null> {
  /**
   * URL of current working directory.
   *
   * @const {URL} cwd
   */
  const cwd: URL = toUrl(withTrailingSlash(options?.cwd ?? cwdUrl()))

  /**
   * Module extensions to probe for.
   *
   * @const {Set<string>} extensions
   */
  const extensions: Set<string> = new Set<string>(['.json', '.jsonc', '.json5'])

  /**
   * URL of parent module.
   *
   * @const {URL} parent
   */
  const parent: URL = new URL('parent.json', cwd)

  /**
   * Module specifiers to try resolving.
   *
   * @const {[string, ModuleId][]} tries
   */
  const tries: [string, ModuleId][] = [
    [String(id), options?.parent ?? parent],
    [pathe.dot + pathe.sep + String(id), parent]
  ]

  /**
   * URL of tsconfig file.
   *
   * @var {URL | null} url
   */
  let url: URL | null = null

  for (const [specifier, parent] of tries) {
    try {
      url = await moduleResolve(
        specifier,
        parent,
        options?.conditions,
        options?.mainFields,
        options?.preserveSymlinks,
        options?.fs
      )
    } catch {
      url = null

      if (!extensions.has(pathe.extname(specifier))) {
        for (const ext of extensions) {
          try {
            url = await moduleResolve(
              pathe.addExt(specifier, ext),
              parent,
              options?.conditions,
              options?.mainFields,
              options?.preserveSymlinks,
              options?.fs
            )

            break
          } catch {
            url = null
          }
        }
      }
    }

    if (url !== null && url.protocol !== 'node:') {
      /**
       * Resolved tsconfig.
       *
       * @const {ResolvedTsconfig} resolved
       */
      const resolved: ResolvedTsconfig = { tsconfig: {}, url }

      /**
       * Contents of tsconfig file.
       *
       * @const {string | null | undefined} contents
       */
      const contents: string | null | undefined = await getSource(url, options)

      if (typeof contents === 'string') {
        resolved.tsconfig = JSON.parse(stripBom(contents.trim() || 'null'))
        if (!isObjectCurly(resolved.tsconfig)) resolved.tsconfig = {}
      }

      return resolved
    }
  }

  return null
}

export default readTsconfig
