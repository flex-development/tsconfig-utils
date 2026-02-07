/**
 * @file Interfaces - ResolvePathOptions
 * @module tsconfig-utils/interfaces/ResolvePathOptions
 */

import type { ResolveAliasOptions } from '@flex-development/mlly'
import type { Tsconfig } from '@flex-development/tsconfig-types'
import type { ResolvedTsconfig } from '@flex-development/tsconfig-utils'

/**
 * Options for path alias resolution.
 *
 * @see {@linkcode ResolveAliasOptions}
 *
 * @extends {ResolveAliasOptions}
 */
interface ResolvePathOptions extends ResolveAliasOptions {
  /**
   * The path mappings dictionary.
   *
   * > 👉 **Note**: Path aliases are read from the {@linkcode tsconfig}.
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
