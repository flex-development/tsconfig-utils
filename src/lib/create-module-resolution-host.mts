/**
 * @file createModuleResolutionHost
 * @module tsconfig-utils/lib/createModuleResolutionHost
 */

import dfs from '#internal/fs'
import toPath from '#internal/to-path'
import withTrailingSlash from '#internal/with-trailing-slash'
import { isDirectory, isFile, type ModuleId } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type {
  FileSystem,
  ModuleResolutionHost,
  ModuleResolutionHostOptions
} from '@flex-development/tsconfig-utils'
import { ok } from 'devlop'

export default createModuleResolutionHost

/**
 * Union of values used to treat filenames as case-sensitive.
 *
 * @internal
 */
type UseCaseSensitiveFileNames = ((this: void) => boolean) | boolean | undefined

/**
 * Create a module resolution host.
 *
 * @see {@linkcode ModuleResolutionHostOptions}
 * @see {@linkcode ModuleResolutionHost}
 *
 * @this {void}
 *
 * @param {ModuleResolutionHostOptions | null | undefined} [options]
 *  Host options
 * @return {ModuleResolutionHost}
 *  Module resolution host object
 */
function createModuleResolutionHost(
  this: void,
  options?: ModuleResolutionHostOptions | null | undefined
): ModuleResolutionHost {
  /**
   * File system API.
   *
   * @var {FileSystem} fs
   */
  let fs: FileSystem = dfs

  /**
   * Path to root directory.
   *
   * @var {string} root
   */
  let root: string = pathe.cwd()

  /**
   * Boolean indicating filenames should be treated as case-sensitive, a
   * function that returns such a boolean, or `undefined` for default treatment
   * of filename casing.
   *
   * @var {UseCaseSensitiveFileNames} useCaseSensitiveFileNames
   */
  let useCaseSensitiveFileNames: UseCaseSensitiveFileNames = undefined

  if (options) {
    if (options.fs) {
      fs = options.fs
    }

    if (options.root !== null && options.root !== undefined) {
      root = toPath(options.root)
    }

    if (
      options.useCaseSensitiveFileNames !== null &&
      options.useCaseSensitiveFileNames !== undefined
    ) {
      useCaseSensitiveFileNames = options.useCaseSensitiveFileNames
    }
  }

  return {
    directoryExists,
    fileExists,
    getCurrentDirectory,
    getDirectories,
    readFile,
    realpath,
    useCaseSensitiveFileNames
  }

  /**
   * Check if a directory exists at `id`.
   *
   * @this {void}
   *
   * @param {ModuleId} id
   *  The module id to check
   * @return {boolean}
   *  `true` if directory exists at `id`, `false` otherwise
   */
  function directoryExists(id: ModuleId): boolean {
    ok(fs, 'expected `fs`')
    return isDirectory(id, fs)
  }

  /**
   * Check if a file exists at `id`.
   *
   * @this {void}
   *
   * @param {ModuleId} id
   *  The module id to check
   * @return {boolean}
   *  `true` if file exists at `id`, `false` otherwise
   */
  function fileExists(id: ModuleId): boolean {
    ok(fs, 'expected `fs`')
    return isFile(id, fs)
  }

  /**
   * Get the path to current working directory.
   *
   * @this {void}
   *
   * @return {string}
   *  Path to current working directory
   */
  function getCurrentDirectory(): string {
    return withTrailingSlash(root)
  }

  /**
   * Get a list of subdirectories.
   *
   * @this {void}
   *
   * @param {ModuleId} id
   *  The directory path or URL to read
   * @return {string[]}
   *  List of subdirectory names
   */
  function getDirectories(id: ModuleId): string[] {
    ok(fs, 'expected `fs`')

    /**
     * List of subdirectory names.
     *
     * @var {string[]} names
     */
    let names: string[] = []

    if (directoryExists(id)) {
      names = fs
        .readdirSync(id = toPath(id), { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    }

    return names
  }

  /**
   * Get the contents of a file.
   *
   * @this {void}
   *
   * @param {ModuleId} id
   *  The file path or URL to read
   * @return {Buffer | string}
   *  File contents or `undefined` if file does not exist at `id`
   */
  function readFile(id: ModuleId): string | undefined {
    ok(fs, 'expected `fs`')

    /**
     * File contents.
     *
     * @var {string | undefined} contents
     */
    let contents: string | undefined

    if (fileExists(id)) {
      contents = String(fs.readFileSync(toPath(id)))
    }

    return contents
  }

  /**
   * Get the resolved pathname of `id`.
   *
   * @this {void}
   *
   * @param {ModuleId} id
   *  The path or `file:` URL to handle
   * @return {string}
   *  Canonical pathname of `id`
   */
  function realpath(this: void, id: ModuleId): string {
    ok(fs, 'expected `fs`')
    return fs.realpathSync(toPath(id))
  }
}
