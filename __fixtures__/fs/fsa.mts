/**
 * @file Fixtures - fsa
 * @module fixtures/fs/fsa
 */

import type { FileSystem } from '@flex-development/tsconfig-utils'
import fs from 'node:fs'

/**
 * A file system API with asynchronous methods.
 *
 * @type {FileSystem}
 */
const fsa: FileSystem = {
  readFile: fs.promises.readFile,
  readdir: fs.promises.readdir,
  realpath: fs.promises.realpath,
  stat: fs.promises.stat
}

export default fsa
