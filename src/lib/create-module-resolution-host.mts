/**
 * @file createModuleResolutionHost
 * @module tsconfig-utils/lib/createModuleResolutionHost
 */

import dfs from '#internal/fs'
import withTrailingSlash from '#internal/with-trailing-slash'
import {
  isDirectory,
  isFile,
  isModuleId,
  type BufferEncoding,
  type EmptyArray,
  type ModuleId
} from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type {
  Awaitable,
  Dirent,
  FileSystem,
  ModuleResolutionHost,
  ModuleResolutionHostOptions,
  UseCaseSensitiveFileNames
} from '@flex-development/tsconfig-utils'
import when from '@flex-development/when'

export default createModuleResolutionHost

/**
 * Create a module resolution host.
 *
 * The module resolution host acts a bridge between the TypeScript compiler
 * and the file system.
 *
 * > 👉 **Note**: The host can have both asynchronous and synchronous methods,
 * > but when used with the native TypeScript compiler, all methods must return
 * > synchronous values.
 *
 * @see {@linkcode ModuleResolutionHostOptions}
 * @see {@linkcode ModuleResolutionHost}
 *
 * @this {void}
 *
 * @param {ModuleResolutionHostOptions | null | undefined} [options]
 *  Options for host creation
 * @return {ModuleResolutionHost}
 *  The module resolution host
 */
function createModuleResolutionHost(
  this: void,
  options?: ModuleResolutionHostOptions | null | undefined
): ModuleResolutionHost {
  /**
   * The encoding to use when reading files.
   *
   * @var {BufferEncoding} encoding
   */
  let encoding: BufferEncoding = 'utf8'

  /**
   * The file system API.
   *
   * @var {FileSystem} fs
   */
  let fs: FileSystem = dfs

  /**
   * The path to the root directory.
   *
   * @var {string} root
   */
  let root: string = pathe.cwd()

  /**
   * Boolean indicating filenames should be treated as case sensitive,
   * a function that returns such a value, or `undefined`.
   *
   * @var {UseCaseSensitiveFileNames} useCaseSensitiveFileNames
   */
  let useCaseSensitiveFileNames: UseCaseSensitiveFileNames = undefined

  if (options) {
    if (options.encoding) encoding = options.encoding
    if (options.fs) fs = options.fs
    if (isModuleId(options.root)) root = pathe.toPath(options.root)

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
   * @template {Awaitable<boolean>} T
   *  The result of the check
   *
   * @this {unknown}
   *
   * @param {ModuleId} id
   *  The module id to check
   * @return {T}
   *  `true` if directory exists at `id`, `false` otherwise
   */
  function directoryExists<T extends Awaitable<boolean>>(id: ModuleId): T

  /**
   * @this {void}
   *
   * @param {ModuleId} id
   *  The module id to check
   * @return {Awaitable<boolean>}
   *  `true` if directory exists at `id`, `false` otherwise
   */
  function directoryExists(this: void, id: ModuleId): Awaitable<boolean> {
    return isDirectory(id, fs)
  }

  /**
   * @template {Awaitable<boolean>} T
   *  The result of the check
   *
   * @this {unknown}
   *
   * @param {ModuleId} id
   *  The module id to check
   * @return {T}
   *  `true` if file exists at `id`, `false` otherwise
   */
  function fileExists<T extends Awaitable<boolean>>(id: ModuleId): T

  /**
   * @this {void}
   *
   * @param {ModuleId} id
   *  The module id to check
   * @return {Awaitable<boolean>}
   *  `true` if file exists at `id`, `false` otherwise
   */
  function fileExists(this: void, id: ModuleId): Awaitable<boolean> {
    return isFile(id, fs)
  }

  /**
   * @template {Awaitable<string>} T
   *  The path
   *
   * @this {unknown}
   *
   * @return {T}
   *  The current working directory path
   */
  function getCurrentDirectory<T extends Awaitable<string>>(): T

  /**
   * @this {void}
   *
   * @return {string}
   *  The current working directory path
   */
  function getCurrentDirectory(this: void): string {
    return withTrailingSlash(root)
  }

  /**
   * @template {Awaitable<string[]>} T
   *  The list of subdirectory names
   *
   * @this {unknown}
   *
   * @param {ModuleId} id
   *  The module id of the parent directory
   * @return {T}
   *  The list of subdirectory names
   */
  function getDirectories<T extends Awaitable<string[]>>(id: ModuleId): T

  /**
   * @this {ModuleResolutionHost}
   *
   * @param {ModuleId} parent
   *  The module id of the parent directory
   * @return {Awaitable<EmptyArray | string[]>}
   *  The list of subdirectory names
   */
  function getDirectories(
    this: ModuleResolutionHost,
    parent: ModuleId
  ): Awaitable<EmptyArray | string[]> {
    return when(this.directoryExists(parent), exists => {
      if (!exists) return []

      /**
       * The directory content.
       *
       * @const {Awaitable<ReadonlyArray<Dirent>>} content
       */
      const content: Awaitable<readonly Dirent[]> = fs.readdir(String(parent), {
        withFileTypes: true
      })

      return when(content, dirents => {
        return dirents.filter(dirent => dirent.isDirectory()).map(dirent => {
          return dirent.name
        })
      })
    })
  }

  /**
   * @template {Awaitable<string | undefined>} T
   *  The file contents
   *
   * @this {unknown}
   *
   * @param {ModuleId} id
   *  The module id of the file
   * @return {T}
   *  The file contents, or `undefined` if file does not exist at `id`
   */
  function readFile<T extends Awaitable<string | undefined>>(id: ModuleId): T

  /**
   * @this {ModuleResolutionHost}
   *
   * @param {ModuleId} id
   *  The module id of the file
   * @return {Awaitable<string | undefined>}
   *  The file contents, or `undefined` if file does not exist at `id`
   */
  function readFile(
    this: ModuleResolutionHost,
    id: ModuleId
  ): Awaitable<string | undefined> {
    return when(this.fileExists(id), exists => {
      return exists ? fs.readFile(pathe.toPath(id), encoding) : undefined
    })
  }

  /**
   * @template {Awaitable<string>} T
   *  The canonical pathname
   *
   * @this {unknown}
   *
   * @param {ModuleId} id
   *  The module id
   * @return {T}
   *  The canonical pathname
   */
  function realpath<T extends Awaitable<string>>(id: ModuleId): T

  /**
   * @this {void}
   *
   * @param {ModuleId} id
   *  The module id
   * @return {Awaitable<string>}
   *  The canonical pathname
   */
  function realpath(this: void, id: ModuleId): Awaitable<string> {
    return fs.realpath(pathe.toPath(id))
  }
}
