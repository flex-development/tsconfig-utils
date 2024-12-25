/**
 * @file Interfaces - ModuleResolutionHost
 * @module tsconfig-utils/interfaces/ModuleResolutionHost
 */

import type { ModuleId } from '@flex-development/mlly'
import type { ModuleResolutionHost } from '@flex-development/tsconfig-utils'

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
   * @see {@linkcode ModuleId}
   *
   * @this {void}
   *
   * @param {ModuleId} id
   *  The directory path or URL to read
   * @param {Set<string> | ReadonlyArray<string> | undefined} [extensions]
   *  List of file extensions to filter for
   * @param {Set<string> | ReadonlyArray<string> | undefined} [exclude]
   *  List of of glob patterns matching files to exclude
   * @param {Set<string> | ReadonlyArray<string> | undefined} [include]
   *  List of of glob patterns matching files to include
   * @param {number | null | undefined} [depth]
   *  Maximum search depth (inclusive)
   * @return {ReadonlyArray<string>}
   *  List of files under directory at `id`
   */
  readDirectory(
    this: void,
    id: ModuleId,
    extensions?: Set<string> | readonly string[] | undefined,
    exclude?: Set<string> | readonly string[] | undefined,
    include?: Set<string> | readonly string[] | undefined,
    depth?: number | null | undefined
  ): readonly string[]

  /**
   * Treat filenames as case-sensitive?
   *
   * @override
   */
  useCaseSensitiveFileNames: boolean
}

export type { ParseConfigHost as default }
