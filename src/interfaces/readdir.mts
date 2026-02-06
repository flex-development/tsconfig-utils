/**
 * @file Interfaces - Readdir
 * @module tsconfig-utils/interfaces/Readdir
 */

import type { ModuleId } from '@flex-development/mlly'
import type {
  Awaitable,
  Dirent,
  ReaddirDirentOptions
} from '@flex-development/tsconfig-utils'

/**
 * Read the entire contents of a directory.
 */
interface Readdir {
  /**
   * @see {@linkcode Awaitable}
   * @see {@linkcode Dirent}
   * @see {@linkcode ModuleId}
   * @see {@linkcode ReaddirDirentOptions}
   *
   * @template {Awaitable<ReadonlyArray<Dirent>>} T
   *  The directory contents
   *
   * @this {unknown}
   *
   * @param {ModuleId} id
   *  The module id
   * @param {ReaddirDirentOptions} options
   *  Read options
   * @return {T}
   *  The directory contents
   */
  <T extends Awaitable<readonly Dirent[]>>(
    id: ModuleId,
    options: ReaddirDirentOptions
  ): T
}

export type { Readdir as default }
