/**
 * @file Interfaces - FileSystemEntries
 * @module tsconfig-utils/interfaces/FileSystemEntries
 */

/**
 * An object containing directory and file names.
 *
 * @internal
 */
interface FileSystemEntries {
  /**
   * The list of directory paths.
   *
   * @readonly
   */
  readonly directories: readonly string[]

  /**
   * The list of file paths.
   *
   * @readonly
   */
  readonly files: readonly string[]
}

export type { FileSystemEntries as default }
