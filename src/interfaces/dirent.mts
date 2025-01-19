/**
 * @file Interfaces - Dirent
 * @module tsconfig-utils/interfaces/Dirent
 */

import type * as fst from '@flex-development/fst-util-from-fs'

/**
 * Directory content entry.
 *
 * @see {@linkcode fst.Dirent}
 *
 * @extends {fst.Dirent}
 */
interface Dirent extends fst.Dirent {
  /**
   * Path to parent directory.
   */
  parentPath: string
}

export type { Dirent as default }
