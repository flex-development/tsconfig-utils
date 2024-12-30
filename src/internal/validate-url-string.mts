/**
 * @file Internal - validateURLString
 * @module tsconfig-utils/internal/validateURLString
 */

import {
  ERR_INVALID_ARG_TYPE,
  type ErrInvalidArgType
} from '@flex-development/errnode'
import pathe from '@flex-development/pathe'

/**
 * Check if `value` is a {@linkcode URL} object or string.
 *
 * @see {@linkcode ErrInvalidArgType}
 *
 * @internal
 *
 * @param {unknown} value
 *  Value to check
 * @param {string} name
 *  Name of invalid argument or property
 * @return {value is URL | string}
 *  `true` if `value` is `URL` object or string
 * @throws {ErrInvalidArgType}
 *  If `value` is not `URL` object or string
 */
function validateURLString(
  value: unknown,
  name: string
): value is URL | string {
  if (typeof value === 'string' || pathe.isURL(value)) return true
  throw new ERR_INVALID_ARG_TYPE(name, ['URL', 'string'], value)
}

export default validateURLString
