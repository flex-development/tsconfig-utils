/**
 * @file Interfaces - ModuleResolutionHostOptions
 * @module tsconfig-utils/interfaces/ModuleResolutionHostOptions
 */

import type { ModuleId } from '@flex-development/mlly'
import type { FileSystem } from '@flex-development/tsconfig-utils'

/**
 * Options for creating module resolution hosts.
 */
interface ModuleResolutionHostOptions {
  /**
   * File system API.
   *
   * @see {@linkcode FileSystem}
   */
  fs?: FileSystem | null | undefined

  /**
   * Module id of root directory.
   *
   * @see {@linkcode ModuleId}
   *
   * @default pathe.cwd()
   */
  root?: ModuleId | null | undefined

  /**
   * Boolean indicating filenames should be treated as case-sensitive, or a
   * function that returns such a value.
   */
  useCaseSensitiveFileNames?:
    | ((this: void) => boolean)
    | boolean
    | null
    | undefined
}

export type { ModuleResolutionHostOptions as default }
