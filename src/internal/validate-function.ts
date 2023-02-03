/**
 * @file Internal - validateFunction
 * @module tsconfig-utils/internal/validateFunction
 */

import { ERR_INVALID_ARG_TYPE, type NodeError } from '@flex-development/errnode'
import { isFunction, type Fn } from '@flex-development/tutils'

/**
 * Checks if given `value` is a function.
 *
 * Throws [`ERR_INVALID_ARG_TYPE`][1] if the `value` is not a function.
 *
 * [1]: https://nodejs.org/api/errors.html#err_invalid_arg_value
 *
 * @see {@linkcode ERR_INVALID_ARG_TYPE}
 *
 * @param {unknown} value - Value supplied by user
 * @param {string} name - Name of invalid argument or property
 * @return {value is Fn} `true` if `value` is a function
 * @throws {NodeError<TypeError>} If `value` is not a function
 */
const validateFunction = (value: unknown, name: string): value is Fn => {
  if (isFunction(value)) return true
  throw new ERR_INVALID_ARG_TYPE(name, 'function', value)
}

export default validateFunction
