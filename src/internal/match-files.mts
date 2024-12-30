/**
 * @file Internal - matchFiles
 * @module tsconfig-utils/internal/matchFiles
 */

import dfs from '#internal/fs'
import getCanonicalFileName from '#lib/create-get-canonical-file-name'
import type { ModuleId } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type {
  FileSystem,
  ModuleResolutionHost
} from '@flex-development/tsconfig-utils'
import {
  alphabetize,
  fork,
  identity
} from '@flex-development/tutils'
import { ok } from 'devlop'

export default matchFiles

/**
 * Union of path types.
 *
 * @internal
 */
type PathType = 'directory' | 'file'

/**
 * Match files in a directory.
 *
 * @see {@linkcode FileSystem}
 * @see {@linkcode ModuleId}
 * @see {@linkcode ModuleResolutionHost}
 *
 * @internal
 *
 * @template {ModuleResolutionHost} Host
 *  Host API
 *
 * @this {void}
 *
 * @param {Host} host
 *  Host object
 * @param {ModuleId} id
 *  The directory path or URL to read
 * @param {Set<string> | ReadonlyArray<string> | undefined} [extensions]
 *  List of file extensions to filter for
 * @param {Set<string> | ReadonlyArray<string> | undefined} [exclude]
 *  List of glob patterns matching files to exclude
 * @param {Set<string> | ReadonlyArray<string> | undefined} [include]
 *  List of glob patterns matching files to include
 * @param {boolean | null | undefined} [useCaseSensitiveFileNames]
 *  Treat filenames as case-sensitive?
 * @param {number | null | undefined} [depth]
 *  Maximum search depth (inclusive)
 * @param {FileSystem | null | undefined} [fs]
 *  File system API
 * @return {string[]}
 *  List of matched files under directory at `id`
 */
function matchFiles<Host extends ModuleResolutionHost>(
  this: void,
  host: Host,
  id: ModuleId,
  extensions: Set<string> | readonly string[] | undefined,
  exclude: Set<string> | readonly string[] | undefined,
  include: Set<string> | readonly string[] | undefined,
  useCaseSensitiveFileNames?: boolean | null | undefined,
  depth?: number | null | undefined,
  fs?: FileSystem | null | undefined
): string[] {
  id = host.realpath(id)
  fs ??= dfs

  /**
   * Record of glob patterns matching directories and files to exclude.
   *
   * @const {Record<PathType, Set<string>>} ignore
   */
  const ignore: Record<PathType, Set<string>> = {
    directory: new Set<string>(),
    file: new Set<string>()
  }

  /**
   * List of matched files.
   *
   * @const {string[]} matched
   */
  const matched: string[] = []

  /**
   * Record of glob patterns matching directories and files to include.
   *
   * @const {Record<PathType, Set<string>>} matchers
   */
  const matchers: Record<PathType, Set<string>> = {
    directory: new Set<string>(),
    file: new Set<string>()
  }

  /**
   * Visited paths.
   *
   * @const {Set<string>} visited
   */
  const visited: Set<string> = new Set<string>()

  pstore(ignore, exclude)
  pstore(matchers, include)

  if (!matchers.directory.size) matchers.directory.add('**/*')

  ignore.directory.add('bower_components')
  ignore.directory.add('node_modules')
  ignore.directory.add('jspm_packages')

  visit(id, '', depth)

  return alphabetize(matched, identity)

  /**
   * Check if `x` is a matched directory or file.
   *
   * @this {void}
   *
   * @param {string} x
   *  The path to match
   * @param {PathType} type
   *  Path type
   * @return {boolean}
   *  `true` if `x` matches include pattern and is not excluded
   */
  function filter(this: void, x: string, type: PathType): boolean {
    return pathe.matchesGlob(x, [...matchers[type]], {
      dot: type === 'file',
      ignore: [...ignore[type]],
      nocase: useCaseSensitiveFileNames !== true
    })
  }

  /**
   * Store glob paterns in `record`.
   *
   * If the last path segment in a pattern does not contain a file extension
   * or wildcard character (`'*'`), it is treated as a directory pattern.
   *
   * @this {void}
   *
   * @param {Record<PathType, Set<string>>} record
   *  Glob pattern record
   * @param {Set<string> | ReadonlyArray<string> | undefined} patterns
   *  List of user glob patterns
   * @return {undefined}
   */
  function pstore(
    this: void,
    record: Record<PathType, Set<string>>,
    patterns: Set<string> | readonly string[] | undefined = []
  ): undefined {
    for (const pattern of patterns) {
      /**
       * Last segment of {@linkcode pattern}.
       *
       * @const {string} segment
       */
      const segment: string = pathe.basename(pattern)

      if (!pathe.extname(segment) && !segment.includes('*')) {
        record.directory.add(pattern)
      } else {
        record.file.add(pattern)
      }
    }

    return void this
  }

  /**
   * Visit the directory at `path` and store matched files.
   *
   * @this {void}
   *
   * @param {string} path
   *  Absolute directory path
   * @param {string} relpath
   *  Relative directory path
   * @param {number | null | undefined} depth
   *  Maximum search depth (inclusive)
   * @return {undefined}
   */
  function visit(
    this: void,
    path: string,
    relpath: string,
    depth: number | null | undefined
  ): undefined {
    ok(fs, 'expected `fs`')

    /**
     * Canonical {@linkcode path}.
     *
     * @const {string} can
     */
    const can: string = getCanonicalFileName(useCaseSensitiveFileNames)(path)

    if (host.directoryExists(path) && !visited.has(can)) {
      visited.add(can)

      /**
       * List where the first item is a list of files under {@linkcode path},
       * and the last item a list of subdirectories.
       *
       * @const {[string[], string[]]} pack
       */
      const pack: [string[], string[]] = fork(
        fs.readdirSync(path),
        x => host.fileExists(pathe.join(path, x))
      )

      for (const file of pack[0]) {
        /**
         * File matched?
         *
         * @var {boolean} match
         */
        let match: boolean = filter(pathe.join(relpath, file), 'file')

        if (extensions) {
          extensions = [...extensions].map(pathe.formatExt)
          match = match && extensions.includes(pathe.extname(file))
        }

        if (match) matched.push(pathe.join(path, file))
      }

      if (depth) {
        depth--
        if (!depth) return void depth
      }

      for (const subdirectory of pack[1]) {
        /**
         * Relative subdirectory path.
         *
         * @const {string} subdir
         */
        const subdir: string = pathe.join(relpath, subdirectory)

        if (filter(subdir, 'directory')) {
          visit(pathe.join(path, subdirectory), subdir, depth)
        }
      }
    }

    return void path
  }
}
