/**
 * @file Interfaces - Realpath
 * @module tsconfig-utils/interfaces/Realpath
 */

import type * as mlly from '@flex-development/mlly'

/**
 * Compute a canonical pathname by resolving `.`, `..`, and symbolic links.
 *
 * > 👉 **Note**: A canonical pathname is not necessarily unique.
 * > Hard links and bind mounts can expose an entity through many pathnames.
 *
 * @see {@linkcode mlly.Realpath}
 *
 * @extends {mlly.Realpath}
 */
interface Realpath extends mlly.Realpath {}

export type { Realpath as default }
