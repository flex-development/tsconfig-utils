/**
 * @file Interfaces - HostReadFile
 * @module tsconfig-utils/interfaces/HostReadFile
 */

import type { ModuleId } from '@flex-development/mlly'
import type { Awaitable } from '@flex-development/tsconfig-utils'

/**
 * Read the entire contents of a file.
 */
interface HostReadFile {
  /**
   * @see {@linkcode Awaitable}
   * @see {@linkcode ModuleId}
   *
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
  <T extends Awaitable<string | undefined>>(id: ModuleId): T
}

export type { HostReadFile as default }
