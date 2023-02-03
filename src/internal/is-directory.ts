/**
 * @file Internal - isDirectory
 * @module tsconfig-utils/internal/isDirectory
 */

import fs from 'node:fs'
import type { URL } from 'node:url'
import validateURLString from './validate-url-string'

/**
 * Checks if a directory exists at the given module `id`.
 *
 * @param {URL | string} id - Module id to evaluate
 * @return {boolean} `true` if directory exists at `id`
 */
const isDirectory = (id: URL | string): boolean => {
  try {
    validateURLString(id, 'id')
    return fs.statSync(id, { throwIfNoEntry: false })?.isDirectory() ?? false
  } catch {
    return false
  }
}

export default isDirectory
