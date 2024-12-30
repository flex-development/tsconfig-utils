/**
 * @file Internal - toPath
 * @module tsconfig-utils/internal/toPath
 */

import validateURLString from '#internal/validate-url-string'
import {
  ERR_INVALID_URL_SCHEME,
  type ErrInvalidUrlScheme
} from '@flex-development/errnode'
import pathe from '@flex-development/pathe'

export default toPath

/**
 * Convert `input` to a path.
 *
 * > 👉 **Note**: `input` is assumed to be a path if it a string and cannot be
 * > parsed to an URL (checked using {@linkcode pathe.isURL}).
 *
 * @see {@linkcode ErrInvalidUrlScheme}
 *
 * @internal
 *
 * @this {void}
 *
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to convert
 * @return {string}
 *  `input` as path
 * @throws {ErrInvalidUrlScheme}
 *  If `input` is not a path or `file:` URL
 */
function toPath(
  this: void,
  input: URL | string
): string {
  validateURLString(input, 'input')

  if (typeof input === 'string') {
    if (!pathe.isURL(input)) return pathe.toPosix(input)
    input = new URL(input)
  }

  if (input.protocol === 'file:') return pathe.fileURLToPath(input)
  throw new ERR_INVALID_URL_SCHEME('file')
}
