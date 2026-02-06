/**
 * @file Type Aliases - GetCanonicalFileName
 * @module tsconfig-utils/types/GetCanonicalFileName
 */

import type { ModuleId } from '@flex-development/mlly'

/**
 * Get the canonical file name for a module id.
 *
 * @see {@linkcode ModuleId}
 *
 * @this {void}
 *
 * @param {ModuleId} id
 *  The module id
 * @return {string}
 *  The canonical file name
 */
type GetCanonicalFileName = (this: void, id: ModuleId) => string

export type { GetCanonicalFileName as default }
