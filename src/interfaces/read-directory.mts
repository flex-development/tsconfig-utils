/**
 * @file Interfaces - ReadDirectory
 * @module tsconfig-utils/interfaces/ReadDirectory
 */

import type { ModuleId } from '@flex-development/mlly'
import type { Awaitable, List } from '@flex-development/tsconfig-utils'

/**
 * Read the contents of a directory.
 */
interface ReadDirectory {
  /**
   * @see {@linkcode Awaitable}
   * @see {@linkcode List}
   * @see {@linkcode ModuleId}
   *
   * @template {Awaitable<ReadonlyArray<string>>} T
   *  The list of matched files
   *
   * @this {unknown}
   *
   * @param {ModuleId} parent
   *  The module id of the parent directory
   * @param {List<string> | null | undefined} [extensions]
   *  The list of file extensions to filter for
   * @param {List<string> | null | undefined} [exclude]
   *  The list of glob patterns matching files to exclude
   * @param {List<string> | null | undefined} [include]
   *  The list of glob patterns matching files to include
   * @param {number | null | undefined} [depth]
   *  The maximum search depth (inclusive)
   * @return {T}
   *  The listed of matched files
   */
  <T extends Awaitable<readonly string[]>>(
    parent: ModuleId,
    extensions?: List<string> | null | undefined,
    exclude?: List<string> | null | undefined,
    include?: List<string> | null | undefined,
    depth?: number | null | undefined
  ): T
}

export type { ReadDirectory as default }
