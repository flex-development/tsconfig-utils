/**
 * @file Interfaces - ResolvedTsconfig
 * @module tsconfig-utils/interfaces/ResolvedTsconfig
 */

import type { TsconfigHost } from '@flex-development/tsconfig-utils'

/**
 * A resolved TypeScript configuration.
 *
 * @see {@linkcode TsconfigHost}
 *
 * @extends {TsconfigHost}
 */
interface ResolvedTsconfig extends TsconfigHost {
  /**
   * The URL of the tsconfig file.
   */
  url: URL
}

export type { ResolvedTsconfig as default }
