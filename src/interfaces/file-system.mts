/**
 * @file Interfaces - FileSystem
 * @module tsconfig-utils/interfaces/FileSystem
 */

import type * as mlly from '@flex-development/mlly'
import type { Dirent } from '@flex-development/tsconfig-utils'

/**
 * File system API.
 *
 * @see {@linkcode mlly.FileSystem}
 *
 * @extends {mlly.FileSystem}
 */
interface FileSystem extends mlly.FileSystem {
  /**
   * Read the contents of the directory at `id`.
   *
   * @see {@linkcode Dirent}
   * @see {@linkcode mlly.ModuleId}
   *
   * @this {void}
   *
   * @param {mlly.ModuleId} id
   *  Module id of directory to read
   * @param {{ withFileTypes: true }} options
   *  Read options
   * @param {true} options.withFileTypes
   *  Return a list of dirent objects instead of strings or `Buffer`s
   * @return {ReadonlyArray<Dirent>}
   *  Directory content list
   */
  readdirSync(
    this: void,
    id: mlly.ModuleId,
    options: { withFileTypes: true }
  ): readonly Dirent[]
}

export type { FileSystem as default }
