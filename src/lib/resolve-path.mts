/**
 * @file resolvePath
 * @module tsconfig-utils/lib/resolvePath
 */

import withTrailingSlash from '#internal/with-trailing-slash'
import isResolvedTsconfig from '#lib/is-resolved-tsconfig'
import type { ModuleId } from '@flex-development/mlly'
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
 *  The specifier using an alias
 * @param {ResolvePathOptions | null | undefined} [options]
 *  Alias resolution options
 * @return {string | null}
 *  The path match or `null` if path alias match is not found
 */
function resolvePath(
  this: void,
  specifier: string,
  options?: ResolvePathOptions | null | undefined
): string | null {
  /**
   * The URL of the directory to resolve non-absolute modules from.
   *
   * @var {ModuleId | null | undefined} baseUrl
   */
  let baseUrl: ModuleId | null | undefined

  /**
   * The URL of the parent module.
   *
   * @var {ModuleId | null | undefined} parent
   */
  let parent: ModuleId | null | undefined

  /**
   * The tsconfig object.
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

  if (mlly.isModuleId(baseUrl) && baseUrl !== parent) {
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
