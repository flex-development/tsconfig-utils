/**
 * @file Interfaces - LoadTsconfigOptions
 * @module tsconfig-utils/interfaces/LoadTsconfigOptions
 */

import type { Fn } from '@flex-development/tutils'
import type { URL } from 'node:url'

/**
 * Options for loading tsconfig files.
 */
interface LoadTsconfigOptions {
  /**
   * Checks if a file exists at the given module `id`.
   *
   * @default internal.isFile
   *
   * @param {URL | string} id - Module id to evaluate
   * @return {boolean} `true` if file exists at `id`, `false` otherwise
   */
  file?: Fn<[URL | string], boolean> | undefined

  /**
   * Reads the file at the given module `id`.
   *
   * @default internal.readFile
   *
   * @param {URL | string} id - Module id to evaluate
   * @return {string} File content at `id`
   */
  read?: Fn<[URL | string], string> | undefined
}

export type { LoadTsconfigOptions as default }
