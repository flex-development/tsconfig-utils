/**
 * @file Interfaces - Dirent
 * @module tsconfig-utils/interfaces/Dirent
 */

import type {
  IsDirectory,
  IsFile,
  IsSymbolicLink
} from '@flex-development/tsconfig-utils'

/**
 * Information about a directory entry.
 */
interface Dirent {
  /**
   * Check if the entry is a directory.
   *
   * @see {@linkcode IsDirectory}
   */
  isDirectory: IsDirectory

  /**
   * Check if the entry is a file.
   *
   * @see {@linkcode IsFile}
   */
  isFile: IsFile

  /**
   * Check if the entry is a symbolic link.
   *
   * @see {@linkcode IsSymbolicLink}
   */
  isSymbolicLink: IsSymbolicLink

  /**
   * The path to the entry, relative to the {@linkcode parentPath}.
   */
  name: string

  /**
   * The path to the parent directory.
   */
  parentPath: string
}

export type { Dirent as default }
