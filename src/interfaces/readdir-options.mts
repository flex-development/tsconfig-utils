/**
 * @file Interfaces - ReaddirOptions
 * @module tsconfig-utils/interfaces/ReaddirOptions
 */

/**
 * Options for reading the contents of a directory.
 */
interface ReaddirOptions {
  /**
   * Whether the result should be a content object list instead of just strings.
   *
   * If `true`, the result will be a list of `Direct` objects, which provide
   * methods like `isDirectory()` or `isFile()` to get more information about
   * a file system entry without additional `fs.stat()` calls.
   */
  withFileTypes?: boolean | null | undefined
}

export type { ReaddirOptions as default }
