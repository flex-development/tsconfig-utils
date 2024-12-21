/**
 * @file resolvePath
 * @module tsconfig-utils/lib/resolvePath
 */

import withTrailingSlash from '#internal/with-trailing-slash'
import isResolvedTsconfig from '#lib/is-resolved-tsconfig'
import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type { Tsconfig } from '@flex-development/tsconfig-types'
import type { ResolvePathOptions } from '@flex-development/tsconfig-utils'

/**
 * Resolve an aliased `specifier`.
 *
 * @see {@linkcode ResolvePathOptions}
 *
 * @this {void}
 *
 * @param {string} specifier
 *  The module specifier to resolve
 * @param {ResolvePathOptions | null | undefined} [options]
 *  Alias resolution options
 * @return {string | null}
 *  Resolved specifier or `null` if path alias match is not found
 */
function resolvePath(
  this: void,
  specifier: string,
  options?: ResolvePathOptions | null | undefined
): string | null {
  /**
   * URL of directory to resolve non-absolute modules from.
   *
   * @var {mlly.ModuleId | null | undefined} baseUrl
   */
  let baseUrl: mlly.ModuleId | null | undefined

  /**
   * URL of parent module.
   *
   * @var {mlly.ModuleId | null | undefined} parent
   */
  let parent: mlly.ModuleId | null | undefined

  /**
   * Tsconfig object.
   *
   * @var {Tsconfig | null | undefined} tsconfig
   */
  let tsconfig: Tsconfig | null | undefined

  if (isResolvedTsconfig(options?.tsconfig)) {
    tsconfig = options.tsconfig.tsconfig
    baseUrl = new URL(pathe.dot, options.tsconfig.url)
    parent = options.tsconfig.url
  } else if (options) {
    tsconfig = options.tsconfig
    baseUrl = options.cwd
  }

  if (typeof tsconfig?.compilerOptions?.baseUrl === 'string') {
    baseUrl = tsconfig.compilerOptions.baseUrl
  }

  if (baseUrl !== null && baseUrl !== undefined && baseUrl !== parent) {
    baseUrl = withTrailingSlash(mlly.toUrl(baseUrl))
  }

  return mlly.resolveAlias(specifier, {
    ...options,
    aliases: tsconfig?.compilerOptions?.paths,
    cwd: baseUrl,
    parent: parent ?? baseUrl
  })
}

export default resolvePath
