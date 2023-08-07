/**
 * @file Interfaces - ResolvePathsOptions
 * @module tsconfig-utils/interfaces/ResolvePathsOptions
 */

import type mlly from '@flex-development/mlly'
import type { Omit, Optional } from '@flex-development/tutils'
import type LoadTsconfigOptions from './options-load-tsconfig'

/**
 * Options for resolving path aliases in `export`, `import`, and `require`
 * statements.
 *
 * @see {@linkcode LoadTsconfigOptions}
 * @see {@linkcode mlly.ResolveAliasOptions}
 *
 * @extends {LoadTsconfigOptions}
 * @extends {Omit<mlly.ResolveAliasOptions,'aliases'|'cwd'>}
 */
interface ResolvePathsOptions
  extends LoadTsconfigOptions,
    Omit<mlly.ResolveAliasOptions, 'aliases' | 'cwd'> {
  /**
   * Return resolved module URLs as absolute specifiers ([`file:` URLs][1]).
   *
   * If `false`, return resolved module URLs as bare or relative specifiers.
   *
   * [1]: https://nodejs.org/api/esm.html#file-urls
   *
   * @see https://nodejs.org/api/esm.html#terminology
   *
   * @default false
   */
  absolute?: Optional<boolean>

  /**
   * Base directory to resolve non-absolute modules from.
   *
   * Overrides `compilerOptions.baseUrl` if set in {@linkcode tsconfig} file.
   */
  baseUrl?: mlly.ResolveAliasOptions['cwd']

  /**
   * Id of module to resolve from.
   */
  parent: mlly.ModuleId

  /**
   * Module id of [tsconfig][1] file.
   *
   * [1]: https://www.typescriptlang.org/tsconfig
   *
   * @default mlly.toURL('tsconfig.json')
   */
  tsconfig?: Optional<mlly.ModuleId>
}

export type { ResolvePathsOptions as default }
