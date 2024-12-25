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
   * Get the contents of a file.
   *
   * @see {@linkcode Buffer}
   * @see {@linkcode mlly.ModuleId}
   *
   * @override
   *
   * @this {void}
   *
   * @param {mlly.ModuleId} id
   *  The path or `file:` URL to handle
   * @return {Buffer | string}
   *  File contents
   */
  readFile(this: void, id: mlly.ModuleId): Buffer | string

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
  readdir(this: void, id: mlly.ModuleId): string[]

  /**
   * Get the resolved pathname of `id`.
   *
   * @see {@linkcode mlly.ModuleId}
   *
   * @override
   *
   * @this {void}
   *
   * @param {mlly.ModuleId} id
   *  The path or `file:` URL to handle
   * @return {string}
   *  Canonical pathname of `id`
   */
  realpath(this: void, id: mlly.ModuleId): string

  /**
   * Get information about a directory or file.
   *
   * @see {@linkcode mlly.ModuleId}
   * @see {@linkcode mlly.Stats}
   *
   * @override
   *
   * @this {void}
   *
   * @param {mlly.ModuleId} id
   *  The path or `file:` URL to handle
   * @return {mlly.Stats}
   *  Info about `id`
   */
  stat(this: void, id: mlly.ModuleId): mlly.Stats
}
export type { FileSystem as default }
