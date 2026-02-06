/**
 * @file Internal - fs/browser
 * @module tsconfig-utils/internal/fs/browser
 */

import type { FileSystem } from '@flex-development/tsconfig-utils'

/**
 * The file system API.
 *
 * @const {FileSystem} fs
 */
const fs: FileSystem = {
  /**
   * Read the entire contents of a file.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  readFile(): never {
    throw new Error('[readFile] not implemented')
  },

  /**
   * Read the entire contents of a directory.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  readdir(): never {
    throw new Error('[readdir] not implemented')
  },

  /**
   * Compute a canonical pathname by resolving `.`, `..`, and symbolic links.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  realpath(): never {
    throw new Error('[realpath] not implemented')
  },

  /**
   * Get information about a file system entry.
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
