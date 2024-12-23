/**
 * @file Internal - fs/node
 * @module mkbuild/internal/fs/node
 */

import type { FileSystem } from '@flex-development/tsconfig-utils'
import { readdirSync, readFileSync, realpathSync, statSync } from 'node:fs'

/**
 * File system API.
 *
 * @const {FileSystem} fs
 */
const fs: FileSystem = {
  readFile: readFileSync,
  readdir: readdirSync,
  realpath: realpathSync,
  stat: statSync
}

export default fs
