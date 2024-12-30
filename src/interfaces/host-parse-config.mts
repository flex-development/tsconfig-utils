/**
 * @file Interfaces - ParseConfigHost
 * @module tsconfig-utils/interfaces/ParseConfigHost
 */

import type {
  ModuleResolutionHost,
  ReadDirectory
} from '@flex-development/tsconfig-utils'

/**
 * Configuration parser host API.
 *
 * Provides methods for accessing the file system and resolving module paths.
 *
 * @see {@linkcode ModuleResolutionHost}
 *
 * @extends {ModuleResolutionHost}
 */
interface ParseConfigHost extends ModuleResolutionHost {
  /**
   * Get a list of files in a directory.
   *
   * @see {@linkcode ReadDirectory}
   */
  readDirectory: ReadDirectory

  /**
   * Treat filenames as case-sensitive?
   *
   * @override
   */
  useCaseSensitiveFileNames: boolean
}

export type { ParseConfigHost as default }
