/**
 * @file Internal - getTsconfig
 * @module tsconfig-utils/internal/getTsconfig
 */

import isTsconfigHost from '#lib/is-tsconfig-host'
import type { Tsconfig, TsconfigHost } from '@flex-development/tsconfig-utils'
import { shake } from '@flex-development/tutils'

/**
 * Get a {@linkcode Tsconfig} from `target`.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {Tsconfig | TsconfigHost | null | undefined} target
 *  Tsconfig or tsconfig host
 * @return {Tsconfig}
 *  TypeScript configuration object
 */
function getTsconfig(
  this: void,
  target: Tsconfig | TsconfigHost | null | undefined
): Tsconfig {
  return shake(isTsconfigHost(target) ? target.tsconfig : target ?? {})
}

export default getTsconfig
