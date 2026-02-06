/**
 * @file Interfaces - DirectoryExists
 * @module tsconfig-utils/interfaces/DirectoryExists
 */

import type { ModuleId } from '@flex-development/mlly'
import type { Awaitable } from '@flex-development/tsconfig-utils'

/**
 * Check if a directory exists.
 */
interface DirectoryExists {
  /**
   * @see {@linkcode Awaitable}
   * @see {@linkcode ModuleId}
   *
   * @template {Awaitable<boolean>} T
   *  The result of the check
   *
   * @this {unknown}
   *
   * @param {ModuleId} id
   *  The module id to check
   * @return {T}
   *  `true` if directory exists at `id`, `false` otherwise
   */
  <T extends Awaitable<boolean>>(id: ModuleId): T
}

export type { DirectoryExists as default }
