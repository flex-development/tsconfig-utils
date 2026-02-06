/**
 * @file Interfaces - IsDirectory
 * @module tsconfig-utils/interfaces/IsDirectory
 */

import type * as mlly from '@flex-development/mlly'

/**
 * Check if a dirent or stats object describes a directory.
 *
 * @see {@linkcode mlly.IsDirectory}
 *
 * @extends {mlly.IsDirectory}
 */
interface IsDirectory extends mlly.IsDirectory {}

export type { IsDirectory as default }
