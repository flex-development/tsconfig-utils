/**
 * @file Interfaces - FileSystem
 * @module tsconfig-utils/interfaces/FileSystem
 */

import type * as mlly from '@flex-development/mlly'

/**
 * File system API.
 *
 * @see {@linkcode mlly.FileSystem}
 *
 * @extends {mlly.FileSystem}
 */
interface FileSystem extends mlly.FileSystem {
  /**
   * Read the contents of a directory.
   *
   * @see {@linkcode mlly.ModuleId}
   *
   * @this {void}
   *
   * @param {mlly.ModuleId} id
   *  The path or `file:` URL to handle
   * @return {string[]}
   *  List of filenames
   */
  readdirSync(this: void, id: mlly.ModuleId): string[]
}

export type { FileSystem as default }
