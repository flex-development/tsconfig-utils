/**
 * @file Internal - visitDirectory
 * @module tsconfig-utils/internal/visitDirectory
 */

import type MatcherPatterns from '#interfaces/matcher-patterns'
import chainOrCall from '#internal/chain-or-call'
import combinePaths from '#internal/combine-paths'
import constant from '#internal/constant'
import dfs from '#internal/fs'
import {
  type MatcherType
} from '#internal/get-matcher-patterns'
import isPromise from '#internal/is-promise'
import withTrailingSlash from '#internal/with-trailing-slash'
import type GetFileSystemEntries from '#types/get-file-system-entries'
import pathe from '@flex-development/pathe'
import type {
  Awaitable,
  FileSystem,
  FileSystemEntries,
  GetCanonicalFileName
} from '@flex-development/tsconfig-utils'
import { ok } from 'devlop'

export default visitDirectory

/**
 * Visit a directory, storing matched files in `files` when found.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode FileSystem}
 * @see {@linkcode GetCanonicalFileName}
 * @see {@linkcode GetFileSystemEntries}
 * @see {@linkcode MatcherPatterns}
 *
 * @internal
 *
 * @this {void}
 *
 * @param {string[]} files
 *  The accumulated list of matched files
 * @param {string | null | undefined} parent
 *  The path to the directory to visit, relative to the `current` directory
 * @param {string} current
 *  The path to the current parent directory
 * @param {Map<string, boolean>} visited
 *  Map, where each key is the canonical file name for a directory
 *  and each value is a boolean indicating whether the directory was visited
 * @param {number | null | undefined} depth
 *  The maximum search depth (inclusive),
 *  with `-1`, `null`, or `undefined` used to search all directories
 * @param {MatcherPatterns} patterns
 *  The matcher patterns record
 * @param {GetCanonicalFileName} toCanonical
 *  A function that returns a canonical file name
 * @param {GetFileSystemEntries} getFileSystemEntries
 *  A function that returns a file system entries record
 * @param {FileSystem | null | undefined} [fs]
 *  The file system API
 * @return {Awaitable<undefined>}
 *  Nothing
 */
function visitDirectory(
  this: void,
  files: string[],
  parent: string | null | undefined,
  current: string,
  visited: Map<string, boolean>,
  depth: number | null | undefined,
  patterns: MatcherPatterns,
  toCanonical: GetCanonicalFileName,
  getFileSystemEntries: GetFileSystemEntries,
  fs?: FileSystem | null | undefined
): Awaitable<undefined> {
  fs ??= dfs

  /**
   * The canonical pathname for the directory.
   *
   * @const {Awaitable<string>} realpath
   */
  const realpath: Awaitable<string> = fs.realpath(combinePaths(current, parent))

  return chainOrCall(realpath, (path = realpath as string) => {
    /**
     * The canonical file name for the directory.
     *
     * @const {string} key
     */
    const key: string = toCanonical(path)

    if (visited.has(key) || visited.has(withTrailingSlash(key))) return void key
    visited.set(key, true)

    /**
     * The file system entries record.
     *
     * @const {Awaitable<FileSystemEntries>} entries
     */
    const entries: Awaitable<FileSystemEntries> = getFileSystemEntries(path, fs)

    return chainOrCall(entries, visit)

    /**
     * @this {void}
     *
     * @param {FileSystemEntries} [content]
     *  The file system entries record
     * @return {Awaitable<undefined>}
     *  Nothing
     */
    function visit(
      this: void,
      content: FileSystemEntries = entries as FileSystemEntries
    ): Awaitable<undefined> {
      for (let file of content.files) { // match files.
        file = combinePaths(parent, file)
        if (!match('file', file, current, patterns)) continue
        files.push(combinePaths(current, file))
      }

      // decrease search depth.
      if (typeof depth === 'number' && depth > 0) {
        depth--
        if (depth <= 0) return void depth
      }

      /**
       * The promises to resolve.
       *
       * @const {PromiseLike<undefined>[]} promises
       */
      const promises: PromiseLike<undefined>[] = []

      // recursively search subdirectories.
      for (let subdir of content.directories) {
        subdir = combinePaths(parent, subdir)
        if (!match('directory', subdir, current, patterns)) continue

        /**
         * The result of the subdirectory visit.
         *
         * @const {Awaitable<undefined>} result
         */
        const result: Awaitable<undefined> = visitDirectory(
          files,
          subdir,
          current,
          visited,
          depth,
          patterns,
          toCanonical,
          getFileSystemEntries,
          fs
        )

        // store visit result promise.
        if (isPromise(result)) promises.push(result)
      }

      if (!promises.length) return undefined
      return Promise.all(promises).then(constant(undefined))
    }
  })
}

/**
 * Check if `path` is a matched directory or file.
 *
 * > 👉 **Note**: Directories are matched by include pattern only.
 * > Files are matched by include pattern and extension.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {MatcherType} type
 *  The matcher type
 * @param {string} path
 *  The path to match
 * @param {string} cwd
 *  The current working directory
 * @param {MatcherPatterns} patterns
 *  The matcher patterns record
 * @return {boolean}
 *  `true` if `path` is matched
 */
function match(
  this: void,
  type: MatcherType,
  path: string,
  cwd: string,
  patterns: MatcherPatterns
): boolean {
  ok(!pathe.isAbsolute(path), 'expected `path` not to be absolute')

  /**
   * Whether a file path is being filtered.
   *
   * @const {boolean} file
   */
  const file: boolean = type === 'file'

  /**
   * The list of patterns matching directories to search or files to include.
   *
   * @const {string[]} pattern
   */
  const pattern: string[] = [...patterns[`${type}Include`]]

  /**
   * Whether {@linkcode path} is a glob match.
   *
   * @const {boolean} globbed
   */
  const globbed: boolean = pathe.matchesGlob(path, pattern, {
    cwd,
    dot: file,
    ignore: [...patterns.exclude],
    nocase: !patterns.useCaseSensitiveFileNames,
    noglobstar: false
  })

  return globbed && file ? patterns.matchExtension(path) : globbed
}
