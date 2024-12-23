/**
 * @file Interfaces - ModuleResolutionHost
 * @module tsconfig-utils/interfaces/ModuleResolutionHost
 */

import type { ModuleId } from '@flex-development/mlly'

/**
 * Module resolution host API.
 *
 * The module resolution host acts a bridge between the TypeScript compiler and
 * the file system.
 */
interface ModuleResolutionHost {
  /**
   * Check if a directory exists at `id`.
   *
   * @see {@linkcode ModuleId}
   *
   * @this {void}
   *
   * @param {ModuleId} id
   *  The module id to check
   * @return {boolean}
   *  `true` if directory exists at `id`, `false` otherwise
   */
  directoryExists(this: void, id: ModuleId): boolean

  /**
   * Check if a file exists at `id`.
   *
   * @see {@linkcode ModuleId}
   *
   * @this {void}
   *
   * @param {ModuleId} id
   *  The module id to check
   * @return {boolean}
   *  `true` if file exists at `id`, `false` otherwise
   */
  fileExists(this: void, id: ModuleId): boolean

  /**
   * Get the path to current working directory.
   *
   * @this {void}
   *
   * @return {string}
   *  Path to current working directory
   */
  getCurrentDirectory(this: void): string

  /**
   * Get a list of subdirectories.
   *
   * @see {@linkcode ModuleId}
   *
   * @this {void}
   *
   * @param {ModuleId} id
   *  The directory path or URL to read
   * @return {string[]}
   *  List of subdirectory names
   */
  getDirectories(this: void, id: ModuleId): string[]

  /**
   * Get the contents of a file.
   *
   * @see {@linkcode ModuleId}
   *
   * @this {void}
   *
   * @param {ModuleId} id
   *  The file path or URL to read
   * @return {Buffer | string}
   *  File contents or `undefined` if file does not exist at `id`
   */
  readFile(this: void, id: ModuleId): string | undefined

  /**
   * Get the canonical pathname of `id`.
   *
   * @see {@linkcode ModuleId}
   *
   * @this {void}
   *
   * @param {ModuleId} id
   *  The path or `file:` URL to handle
   * @return {string}
   *  Canonical pathname of `id`
   */
  realpath(this: void, id: ModuleId): string

  /**
   * Treat filenames as case-sensitive?
   */
  useCaseSensitiveFileNames?: ((this: void) => boolean) | boolean | undefined
}

export type { ModuleResolutionHost as default }
