/**
 * @file Internal - emptyFileSystemEntries
 * @module tsconfig-utils/internal/emptyFileSystemEntries
 */

import type FileSystemEntries from '#interfaces/file-system-entries'
import emptyArray from '#internal/empty-array'

/**
 * An empty file system entries record.
 *
 * @internal
 *
 * @const {FileSystemEntries} emptyFileSystemEntries
 */
const emptyFileSystemEntries: FileSystemEntries = Object.freeze({
  directories: emptyArray,
  files: emptyArray
})

export default emptyFileSystemEntries
