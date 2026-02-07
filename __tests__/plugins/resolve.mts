/**
 * @file Plugins - resolve
 * @module tests/plugins/resolve
 */

import { isBuiltin } from '@flex-development/is-builtin'
import {
  resolveModule,
  type Condition,
  type MainField,
  type ResolveModuleOptions
} from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import { ok } from 'devlop'
import type { PartialResolvedId, PluginContext } from 'rollup'
import type { Plugin, ResolvedConfig } from 'vite'

/**
 * Regular expression matching module ids following virtual modules convention.
 *
 * @const {RegExp} VIRTUAL_MODULE_RE
 */
const VIRTUAL_MODULE_RE: RegExp = /^\\0|(?:(?:\\0)?virtual:)/

export default plugin

/**
 * The plugin API.
 *
 * @internal
 */
interface Api {
  /**
   * Module resolver options.
   *
   * @see {@linkcode ResolveOptions}
   */
  options: Omit<ResolveModuleOptions, 'cwd'> & { cwd: URL }
}

/**
 * Create a module resolver plugin.
 *
 * @see {@linkcode Api}
 * @see {@linkcode Plugin}
 *
 * @this {void}
 *
 * @return {Plugin<Api>}
 *  Module resolver plugin
 */
function plugin(this: void): Plugin<Api> {
  /**
   * The plugin api.
   *
   * @const {Api} api
   */
  const api: Api = { options: {} as Api['options'] }

  return { api, configResolved, name: 'resolve', resolveId }

  /**
   * Read and store the final resolved vite config.
   *
   * @see https://vite.dev/guide/api-plugin.html#configresolved
   *
   * @this {void}
   *
   * @param {ResolvedConfig} config
   *  The resolved vite config
   * @return {undefined}
   */
  function configResolved(this: void, config: ResolvedConfig): undefined {
    api.options.conditions = config.resolve.conditions as Condition[]
    api.options.cwd = pathe.pathToFileURL(config.root + pathe.sep)
    api.options.extensions = config.resolve.extensions
    api.options.mainFields = config.resolve.mainFields as MainField[]
    api.options.preserveSymlinks = config.resolve.preserveSymlinks
    return void this
  }

  /**
   * Resolve a module id.
   *
   * > 👉 **Note**: Does nothing if `id` follows virtual modules convention.
   *
   * @see https://rollupjs.org/plugin-development/#resolveid
   *
   * @this {PluginContext}
   *
   * @param {string} id
   *  The module specifier to resolve
   * @param {string | undefined} importer
   *  The parent module path
   * @return {PartialResolvedId | string | null}
   *  The resolve result
   */
  function resolveId(
    this: PluginContext,
    id: string,
    importer: string | undefined
  ): PartialResolvedId | string | null {
    if (VIRTUAL_MODULE_RE.test(id)) return null
    ok(api.options.cwd, 'expected `api.options.cwd`')

    /**
     * The URL of the parent module.
     *
     * @const {URL} parent
     */
    const parent: URL = importer
      ? pathe.pathToFileURL(importer)
      : new URL('resolve-id.mjs', api.options.cwd)

    if (isBuiltin(id)) {
      return {
        external: true,
        id: String(resolveModule(id, parent))
      }
    }

    return String(resolveModule(id, parent, api.options))
  }
}
