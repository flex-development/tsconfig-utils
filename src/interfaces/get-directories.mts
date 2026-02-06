/**
 * @file Interfaces - GetDirectories
 * @module tsconfig-utils/interfaces/GetDirectories
 */

import type { ModuleId } from '@flex-development/mlly'
import type { Awaitable } from '@flex-development/tsconfig-utils'

/**
 * Get a list of subdirectories.
 */
interface GetDirectories {
  /**
   * @see {@linkcode Awaitable}
   * @see {@linkcode ModuleId}
   *
   * @template {Awaitable<string[]>} T
   *  The list of subdirectory names
   *
   * @this {unknown}
   *
   * @param {ModuleId} parent
   *  The module id of the parent directory
   * @return {T}
   *  The list of subdirectory names
   */
  <T extends Awaitable<string[]>>(parent: ModuleId): T
}

export type { GetDirectories as default }
