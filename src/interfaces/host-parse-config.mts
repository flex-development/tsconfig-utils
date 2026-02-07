/**
 * @file Interfaces - ParseConfigHost
 * @module tsconfig-utils/interfaces/ParseConfigHost
 */

import type {
  ModuleResolutionHost,
  ReadDirectory
} from '@flex-development/tsconfig-utils'

/**
 * The configuration parser host API.
 *
 * The parser host provides methods for accessing the file system
 * and resolving module paths.
 *
 * > 👉 **Note**: The host can have both asynchronous and synchronous methods,
 * > but when used with the native TypeScript compiler, all methods must return
 * > synchronous values.
 *
 * @see {@linkcode ModuleResolutionHost}
 *
 * @extends {ModuleResolutionHost}
 */
interface ParseConfigHost extends ModuleResolutionHost {
  /**
   * Read the contents of a directory.
   *
   * @see {@linkcode ReadDirectory}
   */
  readDirectory: ReadDirectory

  /**
   * Whether to treat filenames as case sensitive.
   *
   * @override
   */
  useCaseSensitiveFileNames: boolean
}

export type { ParseConfigHost as default }
