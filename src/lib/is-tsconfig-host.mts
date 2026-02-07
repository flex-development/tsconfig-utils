/**
 * @file isTsconfigHost
 * @module tsconfig-utils/lib/isTsconfigHost
 */

import type { Tsconfig } from '@flex-development/tsconfig-types'
import type { TsconfigHost } from '@flex-development/tsconfig-utils'

/**
 * Check if `value` is an object with a {@linkcode Tsconfig}.
 *
 * @see {@linkcode TsconfigHost}
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The value to check
 * @return {value is TsconfigHost}
 *  `true` if `value` is tsconfig host object, `false` otherwise
 */
function isTsconfigHost(this: void, value: unknown): value is TsconfigHost {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    'tsconfig' in value &&
    typeof value.tsconfig === 'object' &&
    !Array.isArray(value.tsconfig) &&
    value.tsconfig !== null
  )
}

export default isTsconfigHost
