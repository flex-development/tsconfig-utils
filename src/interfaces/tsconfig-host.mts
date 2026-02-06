/**
 * @file Interfaces - TsconfigHost
 * @module tsconfig-utils/interfaces/TsconfigHost
 */

import type { Tsconfig } from '@flex-development/tsconfig-types'

/**
 * An object with a TypeScript configuration.
 */
interface TsconfigHost {
  /**
   * The tsconfig object.
   *
   * @see {@linkcode Tsconfig}
   */
  tsconfig: Tsconfig
}

export type { TsconfigHost as default }
