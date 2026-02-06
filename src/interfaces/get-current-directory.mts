/**
 * @file Interfaces - GetCurrentDirectory
 * @module tsconfig-utils/interfaces/GetCurrentDirectory
 */

import type { Awaitable } from '@flex-development/tsconfig-utils'

/**
 * Get the path to the current working directory.
 */
interface GetCurrentDirectory {
  /**
   * @see {@linkcode Awaitable}
   *
   * @template {Awaitable<string>} T
   *  The path
   *
   * @this {unknown}
   *
   * @return {T}
   *  The current working directory path
   */
  <T extends Awaitable<string>>(): T
}

export type { GetCurrentDirectory as default }
