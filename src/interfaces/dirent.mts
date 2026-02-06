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
 * An object representing directory content.
 */
interface Dirent {
  /**
   * Check if the dirent describes a directory.
   *
   * @see {@linkcode IsDirectory}
   */
  isDirectory: IsDirectory

  /**
   * Check if the dirent describes a file.
   *
   * @see {@linkcode IsFile}
   */
  isFile: IsFile

  /**
   * Check if the dirent describes a symbolic link.
   *
   * @see {@linkcode IsSymbolicLink}
   */
  isSymbolicLink: IsSymbolicLink

  /**
   * The directory content path, relative to the {@linkcode parentPath}.
   */
  name: string

  /**
   * The path to the parent directory.
   */
  parentPath: string
}

export type { Dirent as default }
