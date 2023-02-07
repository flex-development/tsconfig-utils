/**
 * @file Interfaces - LoadTsconfigOptions
 * @module tsconfig-utils/interfaces/LoadTsconfigOptions
 */

import type mlly from '@flex-development/mlly'
import type { Fn } from '@flex-development/tutils'

/**
 * Options for loading tsconfig files.
 */
interface LoadTsconfigOptions {
  /**
   * Checks if a file exists at the given module `id`.
   *
   * @see {@linkcode mlly.ModuleId}
   *
   * @default internal.isFile
   *
   * @param {mlly.ModuleId} id - Module id to evaluate
   * @return {boolean} `true` if file exists at `id`, `false` otherwise
   */
  file?: Fn<[mlly.ModuleId], boolean> | undefined

  /**
   * Reads the file at the given module `id`.
   *
   * @see {@linkcode mlly.ModuleId}
   *
   * @default internal.readFile
   *
   * @param {mlly.ModuleId} id - Module id to evaluate
   * @return {string} File content at `id`
   */
  read?: Fn<[mlly.ModuleId], string> | undefined
}

export type { LoadTsconfigOptions as default }
