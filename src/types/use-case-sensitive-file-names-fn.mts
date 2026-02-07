/**
 * @file Type Aliases - UseCaseSensitiveFileNamesFn
 * @module tsconfig-utils/types/UseCaseSensitiveFileNamesFn
 */

/**
 * Determine if file names should be treated as case sensitive.
 *
 * @this {void}
 *
 * @return {boolean | null | undefined}
 *  `true` if file names should be treated as case sensitive
 */
type UseCaseSensitiveFileNamesFn = (this: void) => boolean | null | undefined

export type { UseCaseSensitiveFileNamesFn as default }
