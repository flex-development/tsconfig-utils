/**
 * @file Internal - matchFiles
 * @module tsconfig-utils/internal/matchFiles
 */

import type MatcherPatterns from '#interfaces/matcher-patterns'
import chainOrCall from '#internal/chain-or-call'
import emptyArray from '#internal/empty-array'
import dfs from '#internal/fs'
import getMatcherPatterns from '#internal/get-matcher-patterns'
import visitDirectory from '#internal/visit-directory'
import createGetCanonicalFileName from '#lib/create-get-canonical-file-name'
import type GetFileSystemEntries from '#types/get-file-system-entries'
import type { ModuleId } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type {
  Awaitable,
  FileSystem,
  List,
  ModuleResolutionHost
} from '@flex-development/tsconfig-utils'

export default matchFiles

/**
 * Match files in a directory.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode FileSystem}
 * @see {@linkcode GetFileSystemEntries}
 * @see {@linkcode List}
 * @see {@linkcode ModuleId}
 * @see {@linkcode ModuleResolutionHost}
 * @see https://github.com/microsoft/TypeScript/blob/v5.7.2/src/compiler/utilities.ts#L9702
 *
 * @internal
 *
 * @template {ModuleResolutionHost} Host
 *  The host object
 * @template {Awaitable<ReadonlyArray<string>>} T
 *  The list of matched files
 *
 * @this {void}
 *
 * @param {Host} host
 *  The host object
 * @param {ModuleId} parent
 *  The module id of the parent directory
 * @param {List<string> | null | undefined} extensions
 *  The list of file extensions to filter for
 * @param {List<string> | null | undefined} exclude
 *  The list of patterns used to exclude matches
 * @param {List<string> | null | undefined} include
 *  The list of patterns matching files to include
 * @param {boolean | null | undefined} useCaseSensitiveFileNames
 *  Whether to treat filenames as case sensitive
 * @param {number | null | undefined} depth
 *  The maximum search depth (inclusive),
 *  with `-1`, `null`, or `undefined` used to search all directories
 * @param {GetFileSystemEntries} getFileSystemEntries
 *  A function that returns a file system entries record
 * @param {FileSystem | null | undefined} [fs]
 *  The file system API
 * @return {T}
 *  The list of matched files
 */
function matchFiles<
  Host extends ModuleResolutionHost,
  T extends Awaitable<readonly string[]>
>(
  this: void,
  host: Host,
  parent: ModuleId,
  extensions: List<string> | null | undefined,
  exclude: List<string> | null | undefined,
  include: List<string> | null | undefined,
  useCaseSensitiveFileNames: boolean | null | undefined,
  depth: number | null | undefined,
  getFileSystemEntries: GetFileSystemEntries,
  fs?: FileSystem | null | undefined
): T

/**
 * Match files in a directory.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode FileSystem}
 * @see {@linkcode GetFileSystemEntries}
 * @see {@linkcode List}
 * @see {@linkcode ModuleId}
 * @see {@linkcode ModuleResolutionHost}
 * @see https://github.com/microsoft/TypeScript/blob/v5.7.2/src/compiler/utilities.ts#L9702
 *
 * @internal
 *
 * @this {void}
 *
 * @param {ModuleResolutionHost} host
 *  The host object
 * @param {ModuleId} parent
 *  The module id of the parent directory
 * @param {List<string> | null | undefined} extensions
 *  The list of file extensions to filter for
 * @param {List<string> | null | undefined} exclude
 *  The list of patterns used to exclude matches
 * @param {List<string> | null | undefined} include
 *  The list of patterns matching files to include
 * @param {boolean | null | undefined} useCaseSensitiveFileNames
 *  Whether to treat filenames as case sensitive
 * @param {number | null | undefined} depth
 *  The maximum search depth (inclusive)
 * @param {GetFileSystemEntries} getFileSystemEntries
 *  A function that returns a file system entries record
 * @param {FileSystem | null | undefined} [fs]
 *  The file system API
 * @return {Awaitable<ReadonlyArray<string>>}
 *  The list of matched files
 */
function matchFiles(
  this: void,
  host: ModuleResolutionHost,
  parent: ModuleId,
  extensions: List<string> | null | undefined,
  exclude: List<string> | null | undefined,
  include: List<string> | null | undefined,
  useCaseSensitiveFileNames: boolean | null | undefined,
  depth: number | null | undefined,
  getFileSystemEntries: GetFileSystemEntries,
  fs?: FileSystem | null | undefined
): Awaitable<readonly string[]> {
  /**
   * Whether the parent directory exists.
   *
   * @const {Awaitable<boolean>} exists
   */
  const exists: Awaitable<boolean> = host.directoryExists(parent)

  return chainOrCall(exists, (isDirectory = exists as boolean) => {
    if (!isDirectory) return emptyArray

    /**
     * The list of matched files.
     *
     * @const {string[]} files
     */
    const files: string[] = []

    /**
     * The matcher patterns record.
     *
     * @const {MatcherPatterns} patterns
     */
    const patterns: MatcherPatterns = getMatcherPatterns(
      extensions,
      exclude,
      include,
      useCaseSensitiveFileNames
    )

    // add default directory ignore patterns.
    patterns.exclude.add('bower_components')
    patterns.exclude.add('node_modules')
    patterns.exclude.add('jspm_packages')

    return chainOrCall(visitDirectory(
      files,
      null,
      pathe.toPath(parent),
      new Map(),
      depth,
      patterns,
      createGetCanonicalFileName(patterns.useCaseSensitiveFileNames),
      getFileSystemEntries,
      fs ?? dfs
    ), (): readonly string[] => {
      return Object.freeze(files.sort((a, b) => {
        return a.localeCompare(b, undefined, {
          caseFirst: patterns.useCaseSensitiveFileNames ? 'upper' : 'false'
        })
      }))
    })
  })
}
