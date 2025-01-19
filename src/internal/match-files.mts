/**
 * @file Internal - matchFiles
 * @module tsconfig-utils/internal/matchFiles
 */

import dfs from '#internal/fs'
import type { File } from '@flex-development/fst'
import {
  fromFileSystem,
  type Extensions
} from '@flex-development/fst-util-from-fs'
import type { ModuleId } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type {
  Dirent,
  FileSystem,
  ModuleResolutionHost
} from '@flex-development/tsconfig-utils'
import { alphabetize, identity } from '@flex-development/tutils'

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
 * @see {@linkcode Extensions}
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
 *  The path or `file:` URL of the directory to read
 * @param {Extensions | null | undefined} [extensions]
 *  List of file extensions to filter for
 * @param {Readonly<string> | Set<string> | null | undefined} [exclude]
 *  List of patterns used to exclude matches
 * @param {Readonly<string> | Set<string> | null | undefined} [include]
 *  List of patterns matching files to include
 * @param {boolean | null | undefined} [useCaseSensitiveFileNames]
 *  Treat filenames as case-sensitive?
 * @param {number | null | undefined} [depth]
 *  Maximum search depth (inclusive)
 * @param {Partial<FileSystem> | null | undefined} [fs]
 *  File system API
 * @return {ReadonlyArray<string>}
 *  List of matched files
 */
function matchFiles<Host extends ModuleResolutionHost>(
  this: void,
  host: Host,
  id: ModuleId,
  extensions: Extensions | null | undefined,
  exclude: Set<string> | readonly string[] | null | undefined,
  include: Set<string> | readonly string[] | null | undefined,
  useCaseSensitiveFileNames?: boolean | null | undefined,
  depth?: number | null | undefined,
  fs?: Partial<FileSystem> | null | undefined
): readonly string[] {
  /**
   * List of matched files.
   *
   * @const {string[]} files
   */
  const files: string[] = []

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
   * Record of glob patterns matching directories to search and files to
   * include.
   *
   * @const {Record<PathType, Set<string>>} matchers
   */
  const matchers: Record<PathType, Set<string>> = {
    directory: new Set<string>(),
    file: new Set<string>()
  }

  if (host.directoryExists(id)) {
    // store user glob patterns
    exclude && pstore(ignore, exclude)
    include && pstore(matchers, include)

    // add default directory ignore patterns
    ignore.directory.add('bower_components')
    ignore.directory.add('node_modules')
    ignore.directory.add('jspm_packages')

    // add patterns matching directories to search
    for (const pattern of matchers.file) {
      /**
       * Directory name of {@linkcode pattern}.
       *
       * @const {string} dirname
       */
      let dirname: string = pathe.dirname(pattern)

      while (dirname !== pathe.dot) {
        matchers.directory.add(dirname)
        dirname = pathe.dirname(dirname)
      }
    }

    // create matched file tree
    fromFileSystem({
      depth: depth ? depth : null,
      extensions,
      filters: {
        /**
         * Determine if `directory` node should be added to the tree.
         *
         * @this {void}
         *
         * @param {string} x
         *  Relative path to directory
         * @return {boolean}
         *  `true` if `directory` node should be added, `false` otherwise
         */
        directory(this: void, x: string): boolean {
          return filter(x, 'directory')
        },
        /**
         * Determine if `file` node should be added to the tree.
         *
         * @this {void}
         *
         * @param {string} x
         *  Relative path to file
         * @return {boolean}
         *  `true` if `file` node should be added, `false` otherwise
         */
        file(this: void, x: string): boolean {
          return filter(x, 'file')
        }
      },
      // @ts-expect-error [2322] not using `readFileSync`
      fs: { ...dfs, ...fs },
      handles: {
        /**
         * Add matched files.
         *
         * @this {void}
         *
         * @param {File} node
         *  File node
         * @param {Dirent} dirent
         *  Dirent object representing the file `node` was created from
         * @return {undefined}
         */
        file(this: void, node: File, dirent: Dirent): undefined {
          return void files.push(pathe.join(dirent.parentPath, node.name))
        }
      },
      root: id
    })
  }

  return Object.freeze(alphabetize(files, identity))

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
   * @param {Readonly<string> | Set<string>} patterns
   *  User glob patterns
   * @return {undefined}
   */
  function pstore(
    this: void,
    record: Record<PathType, Set<string>>,
    patterns: Set<string> | readonly string[]
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
}
