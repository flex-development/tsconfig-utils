/**
 * @file Internal - isFile
 * @module tsconfig-utils/internal/isFile
 */

import type mlly from '@flex-development/mlly'
import fs from 'node:fs'
import validateURLString from './validate-url-string'

/**
 * Checks if a file exists at the given module `id`.
 *
 * @param {mlly.ModuleId} id - Module id to evaluate
 * @return {boolean} `true` if file exists at `id`
 */
const isFile = (id: mlly.ModuleId): boolean => {
  try {
    validateURLString(id, 'id')
    return fs.statSync(id, { throwIfNoEntry: false })?.isFile() ?? false
  } catch {
    return false
  }
}

export default isFile
