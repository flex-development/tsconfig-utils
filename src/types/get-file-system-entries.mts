/**
 * @file Type Aliases - GetFileSystemEntries
 * @module tsconfig-utils/types/GetFileSystemEntries
 */

import type { ModuleId } from '@flex-development/mlly'
import type {
  Awaitable,
  FileSystem,
  FileSystemEntries
} from '@flex-development/tsconfig-utils'

/**
 * Get a file system entries record.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode FileSystemEntries}
 * @see {@linkcode FileSystem}
 * @see {@linkcode ModuleId}
 *
 * @internal
 *
 * @template {Awaitable<FileSystemEntries>} T
 *  The entries record
 *
 * @this {unknown}
 *
 * @param {ModuleId} parent
 *  The module id of the parent directory
 * @param {FileSystem | null | undefined} fs
 *  The file system API
 * @return {T}
 *  The file system entries record
 */
type GetFileSystemEntries = <T extends Awaitable<FileSystemEntries>>(
  parent: ModuleId,
  fs?: FileSystem | null | undefined
) => T

export type { GetFileSystemEntries as default }
