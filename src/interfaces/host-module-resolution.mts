/**
 * @file Interfaces - ModuleResolutionHost
 * @module tsconfig-utils/interfaces/ModuleResolutionHost
 */

import type {
  DirectoryExists,
  FileExists,
  GetCurrentDirectory,
  GetDirectories,
  HostReadFile,
  Realpath,
  UseCaseSensitiveFileNames
} from '@flex-development/tsconfig-utils'

/**
 * The module resolution host API.
 *
 * The module resolution host acts a bridge between the TypeScript compiler
 * and the file system.
 *
 * > 👉 **Note**: The host can have both asynchronous and synchronous methods,
 * > but when used with the native TypeScript compiler, all methods must return
 * > synchronous values.
 */
interface ModuleResolutionHost {
  /**
   * Check if a directory exists.
   *
   * @see {@linkcode DirectoryExists}
   */
  directoryExists: DirectoryExists

  /**
   * Check if a file exists.
   *
   * @see {@linkcode FileExists}
   */
  fileExists: FileExists

  /**
   * Get the path to the current working directory.
   *
   * @see {@linkcode GetCurrentDirectory}
   */
  getCurrentDirectory: GetCurrentDirectory

  /**
   * Get a list of subdirectories.
   *
   * @see {@linkcode GetDirectories}
   */
  getDirectories: GetDirectories

  /**
   * Read the entire contents of a file.
   *
   * @see {@linkcode HostReadFile}
   */
  readFile: HostReadFile

  /**
   * Compute a canonical pathname by resolving `.`, `..`, and symbolic links.
   *
   * @see {@linkcode Realpath}
   *
   * @override
   */
  realpath: Realpath

  /**
   * Whether to treat filenames as case-sensitive.
   *
   * @see {@linkcode UseCaseSensitiveFileNames}
   */
  useCaseSensitiveFileNames?: UseCaseSensitiveFileNames
}

export type { ModuleResolutionHost as default }
