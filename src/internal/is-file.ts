/**
 * @file Internal - isFile
 * @module tsconfig-utils/internal/isFile
 */

import fs from 'node:fs'
import type { URL } from 'node:url'
import validateURLString from './validate-url-string'

/**
 * Checks if a file exists at the given module `id`.
 *
 * @param {URL | string} id - Module id to evaluate
 * @return {boolean} `true` if file exists at `id`
 */
const isFile = (id: URL | string): boolean => {
  try {
    validateURLString(id, 'id')
    return fs.statSync(id, { throwIfNoEntry: false })?.isFile() ?? false
  } catch {
    return false
  }
}

export default isFile
