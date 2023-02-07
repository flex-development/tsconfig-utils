/**
 * @file Internal - readFile
 * @module tsconfig-utils/internal/readFile
 */

import type { NodeError } from '@flex-development/errnode'
import type mlly from '@flex-development/mlly'
import fs from 'node:fs'
import validateURLString from './validate-url-string'

/**
 * Reads the file at the given module `id`.
 *
 * @param {mlly.ModuleId} id - Module id to evaluate
 * @return {string} File content at `id`
 * @throws {NodeError<Error | TypeError>} If `id` is not a string or an instance
 * of {@linkcode URL}, or if error occurs while reading file
 */
const readFile = (id: mlly.ModuleId): string => {
  validateURLString(id, 'id')
  return fs.readFileSync(id, 'utf8')
}

export default readFile
