/**
 * @file Interfaces - ReaddirDirentOptions
 * @module tsconfig-utils/interfaces/ReaddirDirentOptions
 */

import type { ReaddirOptions } from '@flex-development/tsconfig-utils'

/**
 * Options for reading the contents of a directory.
 *
 * @extends {ReaddirOptions}
 */
interface ReaddirDirentOptions extends ReaddirOptions {
  /**
   * Whether the result should be a content object list instead of just strings.
   *
   * If `true`, the result will be a list of `Direct` objects, which provide
   * methods like `isDirectory()` or `isFile()` to get more information about
   * a file system entry without additional `fs.stat()` calls.
   *
   * @override
   */
  withFileTypes: true
}

export type { ReaddirDirentOptions as default }
