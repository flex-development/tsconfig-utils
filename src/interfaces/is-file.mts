/**
 * @file Interfaces - IsFile
 * @module tsconfig-utils/interfaces/IsFile
 */

import type * as mlly from '@flex-development/mlly'

/**
 * Check if a dirent or stats object describes a file.
 *
 * @see {@linkcode mlly.IsFile}
 *
 * @extends {mlly.IsFile}
 */
interface IsFile extends mlly.IsFile {}

export type { IsFile as default }
