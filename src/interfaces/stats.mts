/**
 * @file Interfaces - Stats
 * @module tsconfig-utils/interfaces/Stats
 */

import type * as mlly from '@flex-development/mlly'
import type { IsDirectory, IsFile } from '@flex-development/tsconfig-utils'

/**
 * An object containing information about a file system entry.
 *
 * @see {@linkcode mlly.Stats}
 *
 * @extends {mlly.Stats}
 */
interface Stats extends mlly.Stats {
  /**
   * Check if the entry is a directory.
   *
   * @see {@linkcode IsDirectory}
   *
   * @override
   */
  isDirectory: IsDirectory

  /**
   * Check if the entry is a file.
   *
   * @see {@linkcode IsFile}
   *
   * @override
   */
  isFile: IsFile
}

export type { Stats as default }
