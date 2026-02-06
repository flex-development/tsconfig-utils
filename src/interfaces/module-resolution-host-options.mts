/**
 * @file Interfaces - ModuleResolutionHostOptions
 * @module tsconfig-utils/interfaces/ModuleResolutionHostOptions
 */

import type { BufferEncoding, ModuleId } from '@flex-development/mlly'
import type {
  FileSystem,
  UseCaseSensitiveFileNames
} from '@flex-development/tsconfig-utils'

/**
 * Options for creating module resolution hosts.
 */
interface ModuleResolutionHostOptions {
  /**
   * The encoding to use when reading files.
   *
   * @see {@linkcode BufferEncoding}
   *
   * @default 'utf8'
   */
  encoding?: BufferEncoding | null | undefined

  /**
   * The file system API.
   *
   * @see {@linkcode FileSystem}
   */
  fs?: FileSystem | null | undefined

  /**
   * The module id of the root directory.
   *
   * @see {@linkcode ModuleId}
   *
   * @default pathe.cwd()
   */
  root?: ModuleId | null | undefined

  /**
   * Boolean indicating whether filenames should be treated as case-sensitive,
   * or a function that returns such a value.
   *
   * @see {@linkcode UseCaseSensitiveFileNames}
   */
  useCaseSensitiveFileNames?: UseCaseSensitiveFileNames
}

export type { ModuleResolutionHostOptions as default }
