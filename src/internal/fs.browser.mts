/**
 * @file Internal - fs/browser
 * @module tsconfig-utils/internal/fs/browser
 */

import type { FileSystem } from '@flex-development/tsconfig-utils'

/**
 * File system API.
 *
 * @const {FileSystem} fs
 */
const fs: FileSystem = {
  /**
   * Synchronously get the contents of a file.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  readFile(): never {
    throw new Error('[readFile] not implemented')
  },

  /**
   * Synchronously read the contents of a directory.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  readdir(): never {
    throw new Error('[readdir] not implemented')
  },

  /**
   * Get the resolved pathname of a directory or file.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  realpath(): never {
    throw new Error('[realpath] not implemented')
  },

  /**
   * Synchronously get information about a directory or file.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  stat(): never {
    throw new Error('[stat] not implemented')
  }
}

export default fs
