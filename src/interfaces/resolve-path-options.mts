/**
 * @file Interfaces - ResolvePathOptions
 * @module tsconfig-utils/interfaces/ResolvePathOptions
 */

import type { ResolveAliasOptions } from '@flex-development/mlly'
import type {
  ResolvedTsconfig,
  Tsconfig
} from '@flex-development/tsconfig-utils'

/**
 * Path alias resolution options.
 *
 * @see {@linkcode ResolveAliasOptions}
 *
 * @extends {ResolveAliasOptions}
 */
interface ResolvePathOptions extends ResolveAliasOptions {
  /**
   * The path mappings dictionary.
   *
   * @override
   */
  aliases?: null | undefined

  /**
   * The tsconfig object, or the resolved tsconfig.
   *
   * @see {@linkcode ResolvedTsconfig}
   * @see {@linkcode Tsconfig}
   */
  tsconfig?: ResolvedTsconfig | Tsconfig | null | undefined
}

export type { ResolvePathOptions as default }
