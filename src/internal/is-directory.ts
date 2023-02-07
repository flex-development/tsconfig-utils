/**
 * @file Internal - isDirectory
 * @module tsconfig-utils/internal/isDirectory
 */

import type mlly from '@flex-development/mlly'
import fs from 'node:fs'
import validateURLString from './validate-url-string'

/**
 * Checks if a directory exists at the given module `id`.
 *
 * @param {mlly.ModuleId} id - Module id to evaluate
 * @return {boolean} `true` if directory exists at `id`
 */
const isDirectory = (id: mlly.ModuleId): boolean => {
  try {
    validateURLString(id, 'id')
    return fs.statSync(id, { throwIfNoEntry: false })?.isDirectory() ?? false
  } catch {
    return false
  }
}

export default isDirectory
