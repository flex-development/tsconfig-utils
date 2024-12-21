/**
 * @file Interfaces - ResolvedTsconfig
 * @module tsconfig-utils/interfaces/ResolvedTsconfig
 */

import type { TsconfigHost } from '@flex-development/tsconfig-utils'

/**
 * Resolved TypeScript configuration.
 *
 * @see {@linkcode TsconfigHost}
 *
 * @extends {TsconfigHost}
 */
interface ResolvedTsconfig extends TsconfigHost {
  /**
   * URL of tsconfig file.
   */
  url: URL
}

export type { ResolvedTsconfig as default }
