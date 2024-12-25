/**
 * @file createParseConfigHost
 * @module tsconfig-utils/lib/createParseConfigHost
 */

import dfs from '#internal/fs'
import createModuleResolutionHost from '#lib/create-module-resolution-host'
import type { ModuleId } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type {
  FileSystem,
  ModuleResolutionHost,
  ParseConfigHost,
  ParseConfigHostOptions
} from '@flex-development/tsconfig-utils'
import {
  alphabetize,
  fork,
  identity,
  lowercase
} from '@flex-development/tutils'
import { ok } from 'devlop'

export default createParseConfigHost

/**
 * Union of path types.
 *
 * @internal
 */
type PathType = 'directory' | 'file'

/**
 * Create a parse config host.
 *
 * @see {@linkcode ParseConfigHostOptions}
 * @see {@linkcode ParseConfigHost}
 *
 * @this {void}
 *
 * @param {ParseConfigHostOptions | null | undefined} [options]
 *  Host options
 * @return {ParseConfigHost}
 *  Parse config host object
 */
function createParseConfigHost(
  this: void,
  options?: ParseConfigHostOptions | null | undefined
): ParseConfigHost {
  /**
   * Module resolution host object.
   *
   * @const {ModuleResolutionHost} host
   */
  const host: ModuleResolutionHost = createModuleResolutionHost(options)

  /**
   * File system API.
   *
   * @var {FileSystem} fs
   */
  let fs: FileSystem = dfs

  /**
   * Treat filenames as case-sensitive?
   *
   * @var {boolean} useCaseSensitiveFileNames
   */
  let useCaseSensitiveFileNames: boolean = !!host.useCaseSensitiveFileNames

  if (options) {
    if (options.fs) {
      fs = options.fs
    }
  }

  if (typeof host.useCaseSensitiveFileNames === 'function') {
    useCaseSensitiveFileNames = host.useCaseSensitiveFileNames()
  }

  return {
    directoryExists: host.directoryExists,
    fileExists: host.fileExists,
    getCurrentDirectory: host.getCurrentDirectory,
    getDirectories: host.getDirectories,
    readDirectory,
    readFile: host.readFile,
    realpath: host.realpath,
    useCaseSensitiveFileNames
  }

  /**
   * Get a list of files in a directory.
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
  function readDirectory(
    this: void,
    id: ModuleId,
    extensions: Set<string> | readonly string[] | undefined,
    exclude: Set<string> | readonly string[] | undefined,
    include: Set<string> | readonly string[] | undefined,
    depth?: number | null | undefined
  ): readonly string[] {
    id = host.realpath(id)

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

    matchers.directory.add('bower_components')
    matchers.directory.add('node_modules')
    matchers.directory.add('jspm_packages')

    visit(id, '', depth)

    return Object.freeze(alphabetize(matched, identity))

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
        ignore: [...ignore[type]]
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
       * @var {string} path
       */
      let canonical: string = path

      // https://github.com/microsoft/TypeScript/blob/v5.7.2/src/compiler/core.ts#L1839-L1879
      if (!useCaseSensitiveFileNames) {
        canonical = path.replace(
          // eslint-disable-next-line unicorn/better-regex
          /[^\u0130\u0131\u00DFa-z0-9\\/:\-_. ]+/g,
          lowercase
        )
      }

      if (host.directoryExists(path) && !visited.has(canonical)) {
        visited.add(canonical)

        /**
         * List where the first item is a list of files under {@linkcode path},
         * and the last item a list of subdirectories.
         *
         * @const {[string[], string[]]} pack
         */
        const pack: [string[], string[]] = fork(
          fs.readdir(path),
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
}
