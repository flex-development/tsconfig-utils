/**
 * @file Internal - matchFiles
 * @module tsconfig-utils/internal/matchFiles
 */

import type MatcherPatterns from '#interfaces/matcher-patterns'
import combinePaths from '#internal/combine-paths'
import emptyArray from '#internal/empty-array'
import getMatcherPatterns, {
  type MatcherType
} from '#internal/get-matcher-patterns'
import createGetCanonicalFileName from '#lib/create-get-canonical-file-name'
import type {
  File,
  AnyParent as Parent,
  Root
} from '@flex-development/fst'
import { fromFileSystem } from '@flex-development/fst-util-from-fs'
import type { ModuleId } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type {
  Awaitable,
  Dirent,
  FileSystem,
  List,
  ModuleResolutionHost
} from '@flex-development/tsconfig-utils'
import when from '@flex-development/when'
import { ok } from 'devlop'

export default matchFiles

/**
 * Match files in a directory.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode FileSystem}
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
  fs?: FileSystem | null | undefined
): T

/**
 * Match files in a directory.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode FileSystem}
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
  fs?: FileSystem | null | undefined
): Awaitable<readonly string[]> {
  return when(host.directoryExists(parent), isDirectory => {
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

    /**
     * The file system tree.
     *
     * @const {Awaitable<Root>} tree
     */
    const tree: Awaitable<Root> = fromFileSystem({
      depth: typeof depth === 'number' && depth <= 0 ? null : depth,
      filters: {
        /**
         * Determine if a directory should be searched.
         *
         * @this {void}
         *
         * @param {string} path
         *  The path to the directory, relative to its parent directory
         * @return {boolean}
         *  `true` if directory should be searched, `false` otherwise
         */
        directory(this: void, path: string): boolean {
          return match('directory', path, patterns)
        },
        /**
         * Match a file.
         *
         * @this {void}
         *
         * @param {string} path
         *  The path to the file, relative to its parent directory
         * @return {boolean}
         *  `true` if file is matched, `false` otherwise
         */
        file(this: void, path: string): boolean {
          return match('file', path, patterns)
        }
      },
      fs,
      handles: {
        /**
         * Store a file path.
         *
         * @this {void}
         *
         * @param {File} node
         *  The node representing the file
         * @param {Dirent} dirent
         *  The dirent representing the file
         * @param {Parent} parent
         *  The parent of `node`
         * @param {Root} tree
         *  The current file system tree
         * @param {Parent[]} ancestors
         *  The ancestors of `node`, with the last node being `parent`
         * @return {undefined}
         */
        file(
          this: void,
          node: File,
          dirent: Dirent,
          parent: Parent,
          tree: Root,
          ancestors: Parent[]
        ): undefined {
          /**
           * The list of relative ancestor paths.
           *
           * @const {string[]} paths
           */
          const paths: string[] = [...ancestors.slice(1), node].map(node => {
            ok(node.type !== 'root', 'did not expect `tree`')
            return node.name
          })

          return void files.push(combinePaths(tree.path, ...paths))
        }
      },
      root: parent,
      visitKey: createGetCanonicalFileName(patterns.useCaseSensitiveFileNames)
    })

    return when(tree, () => {
      return Object.freeze(files.sort((a, b) => {
        return a.localeCompare(b, undefined, {
          caseFirst: patterns.useCaseSensitiveFileNames ? 'upper' : 'false'
        })
      }))
    })
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
 * @param {MatcherPatterns} patterns
 *  The matcher patterns record
 * @return {boolean}
 *  `true` if `path` is matched
 */
function match(
  this: void,
  type: MatcherType,
  path: string,
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
    dot: file,
    ignore: [...patterns.exclude],
    nocase: !patterns.useCaseSensitiveFileNames,
    noglobstar: false
  })

  return globbed && file ? patterns.matchExtension(path) : globbed
}
