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
   * Path mappings.
   *
   * @override
   */
  aliases?: null | undefined

  /**
   * Tsconfig object.
   *
   * @see {@linkcode ResolvedTsconfig}
   * @see {@linkcode Tsconfig}
   */
  tsconfig?: ResolvedTsconfig | Tsconfig | null | undefined
}

export type { ResolvePathOptions as default }
