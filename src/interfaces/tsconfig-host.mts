/**
 * @file Interfaces - TsconfigHost
 * @module tsconfig-utils/interfaces/TsconfigHost
 */

import type { Tsconfig } from '@flex-development/tsconfig-utils'

/**
 * An object with a TypeScript configuration.
 */
interface TsconfigHost {
  /**
   * Tsconfig object.
   *
   * @see {@linkcode Tsconfig}
   */
  tsconfig: Tsconfig
}

export type { TsconfigHost as default }
