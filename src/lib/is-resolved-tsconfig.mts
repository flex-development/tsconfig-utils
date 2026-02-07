/**
 * @file isResolvedTsconfig
 * @module tsconfig-utils/lib/isResolvedTsconfig
 */

import isTsconfigHost from '#lib/is-tsconfig-host'
import pathe from '@flex-development/pathe'
import type { ResolvedTsconfig } from '@flex-development/tsconfig-utils'

/**
 * Check if `value` is a resolved configuration object.
 *
 * @see {@linkcode ResolvedTsconfig}
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The value to check
 * @return {value is ResolvedTsconfig}
 *  `true` if `value` is resolved tsconfig object, `false` otherwise
 */
function isResolvedTsconfig(
  this: void,
  value: unknown
): value is ResolvedTsconfig {
  return (
    isTsconfigHost(value) &&
    'url' in value &&
    typeof value.url === 'object' &&
    pathe.isURL(value.url)
  )
}

export default isResolvedTsconfig
