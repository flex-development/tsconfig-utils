/**
 * @file Type Aliases - UseCaseSensitiveFileNames
 * @module tsconfig-utils/types/UseCaseSensitiveFileNames
 */

import type {
  UseCaseSensitiveFileNamesFn
} from '@flex-development/tsconfig-utils'

/**
 * Union of values used to determine if file names should be
 * treated as case sensitive.
 *
 * @see {@linkcode UseCaseSensitiveFileNamesFn}
 */
type UseCaseSensitiveFileNames =
  | UseCaseSensitiveFileNamesFn
  | boolean
  | null
  | undefined

export type { UseCaseSensitiveFileNames as default }
