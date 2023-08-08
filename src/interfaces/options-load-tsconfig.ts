/**
 * @file Interfaces - LoadTsconfigOptions
 * @module tsconfig-utils/interfaces/LoadTsconfigOptions
 */

import type mlly from '@flex-development/mlly'
import type { Fn, Optional } from '@flex-development/tutils'

/**
 * Options for loading tsconfig files.
 */
interface LoadTsconfigOptions {
  /**
   * Checks if a file exists at the given module `id`.
   *
   * @see {@linkcode mlly.ModuleId}
   *
   * @default mlly.isFile
   *
   * @param {mlly.ModuleId} id - Module id to evaluate
   * @return {boolean} `true` if file exists at `id`, `false` otherwise
   */
  file?: Optional<Fn<[mlly.ModuleId], boolean>>

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
  read?: Optional<Fn<[mlly.ModuleId], string>>
}

export type { LoadTsconfigOptions as default }
