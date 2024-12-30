/**
 * @file Type Aliases - GetCanonicalFileName
 * @module tsconfig-utils/types/GetCanonicalFileName
 */

import type { ModuleId } from '@flex-development/mlly'

/**
 * Get a standardized file path for `id`.
 *
 * @see {@linkcode ModuleId}
 *
 * @this {void}
 *
 * @param {ModuleId} id
 *  The path or `file:` URL to handle
 * @return {string}
 *  Canonical file path for `id`
 */
type GetCanonicalFileName = (this: void, id: ModuleId) => string

export type { GetCanonicalFileName as default }
