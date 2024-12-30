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
   * Get the contents of a file.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  readFileSync(): never {
    throw new Error('[readFileSync] not implemented')
  },

  /**
   * Read the contents of a directory.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  readdirSync(): never {
    throw new Error('[readdirSync] not implemented')
  },

  /**
   * Get the resolved pathname of a directory or file.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  realpathSync(): never {
    throw new Error('[realpathSync] not implemented')
  },

  /**
   * Get information about a directory or file.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  statSync(): never {
    throw new Error('[statSync] not implemented')
  }
}

export default fs
