/**
 * @file Interfaces - FileSystem
 * @module tsconfig-utils/interfaces/FileSystem
 */

import type * as mlly from '@flex-development/mlly'
import type {
  Readdir,
  ReadFile,
  Realpath,
  Stat
} from '@flex-development/tsconfig-utils'

/**
 * The file system API.
 *
 * @see {@linkcode mlly.FileSystem}
 *
 * @extends {mlly.FileSystem}
 */
interface FileSystem extends mlly.FileSystem {
  /**
   * Read the entire contents of a file.
   *
   * @see {@linkcode ReadFile}
   *
   * @override
   */
  readFile: ReadFile

  /**
   * Read the entire contents of a directory.
   *
   * @see {@linkcode Readdir}
   */
  readdir: Readdir

  /**
   * Compute a canonical pathname by resolving `.`, `..`, and symbolic links.
   *
   * @see {@linkcode Realpath}
   *
   * @override
   */
  realpath: Realpath

  /**
   * Get information about a file system entry.
   *
   * @see {@linkcode Stat}
   *
   * @override
   */
  stat: Stat
}

export type { FileSystem as default }
