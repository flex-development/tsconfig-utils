/**
 * @file Internal - fs/node
 * @module tsconfig-utils/internal/fs/node
 */

import type { FileSystem } from '@flex-development/tsconfig-utils'
import nfs from 'node:fs'

/**
 * The file system API.
 *
 * @const {FileSystem} fs
 */
const fs: FileSystem = {
  readFile: nfs.readFileSync,
  readdir: nfs.readdirSync,
  realpath: nfs.realpathSync,
  stat: nfs.statSync
}

export default fs
