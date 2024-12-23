/**
 * @file createModuleResolutionHost
 * @module tsconfig-utils/lib/createModuleResolutionHost
 */

import dfs from '#internal/fs'
import type { ModuleId } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type {
  FileSystem,
  ModuleResolutionHost
} from '@flex-development/tsconfig-utils'
import { ok } from 'devlop'

/**
 * Create a module resolution host.
 *
 * @see {@linkcode FileSystem}
 * @see {@linkcode ModuleResolutionHost}
 *
 * @this {void}
 *
 * @param {FileSystem | null | undefined} [fs]
 *  File system API
 * @return {ModuleResolutionHost}
 *  Module resolution host object
 */
function createModuleResolutionHost(
  this: void,
  fs?: FileSystem | null | undefined
): ModuleResolutionHost {
  fs ??= dfs

  return {
    directoryExists,
    fileExists,
    getCurrentDirectory,
    getDirectories,
    readFile,
    realpath,
    useCaseSensitiveFileNames: undefined
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
    try {
      ok(fs, 'expected `fs`')
      return fs.stat(pathe.toPath(id)).isDirectory()
    } catch {
      return false
    }
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
    try {
      ok(fs, 'expected `fs`')
      return fs.stat(pathe.toPath(id)).isFile()
    } catch {
      return false
    }
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
    return pathe.cwd() + pathe.sep
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
      id = pathe.toPath(id)

      names = fs.readdir(id).filter(x => {
        return directoryExists(pathe.join(id as string, x))
      })
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
      contents = String(fs.readFile(pathe.toPath(id)))
    }

    return contents
  }

  /**
   * Get the canonical pathname of `id`.
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
    return fs.realpath(pathe.toPath(id))
  }
}

export default createModuleResolutionHost
