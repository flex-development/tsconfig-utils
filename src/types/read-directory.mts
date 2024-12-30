/**
 * @file Type Aliases - ReadDirectory
 * @module tsconfig-utils/types/ReadDirectory
 */

import type { ModuleId } from '@flex-development/mlly'

/**
 * Get a list of files in a directory.
 *
 * @see {@linkcode ModuleId}
 *
 * @template {ReadonlyArray<string>} Files
 *  List of files in directory
 *
 * @this {void}
 *
 * @param {ModuleId} id
 *  The directory path or URL to read
 * @param {Set<string> | ReadonlyArray<string> | undefined} [extensions]
 *  List of file extensions to filter for
 * @param {Set<string> | ReadonlyArray<string> | undefined} [exclude]
 *  List of glob patterns matching files to exclude
 * @param {Set<string> | ReadonlyArray<string> | undefined} [include]
 *  List of glob patterns matching files to include
 * @param {number | null | undefined} [depth]
 *  Maximum search depth (inclusive)
 * @return {Files}
 *  List of files under directory at `id`
 */
type ReadDirectory<Files extends readonly string[] = readonly string[]> = (
  this: void,
  id: ModuleId,
  extensions?: Set<string> | readonly string[] | undefined,
  exclude?: Set<string> | readonly string[] | undefined,
  include?: Set<string> | readonly string[] | undefined,
  depth?: number | null | undefined
) => Files

export type { ReadDirectory as default }
