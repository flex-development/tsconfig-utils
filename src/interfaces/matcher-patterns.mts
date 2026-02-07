/**
 * @file Interfaces - MatcherPatterns
 * @module tsconfig-utils/interfaces/MatcherPatterns
 */

import type { ModuleId } from '@flex-development/mlly'

/**
 * A dictionary of patterns used to matching directories and files.
 *
 * @internal
 */
interface MatcherPatterns {
  /**
   * The list of patterns matching subdirectories to search.
   */
  directoryInclude: Set<string>

  /**
   * The list of patterns matching directories and files to exclude.
   */
  exclude: Set<string>

  /**
   * The list of patterns matching files to include.
   */
  fileInclude: Set<string>

  /**
   * Check if `target` ends with a configured extension.
   *
   * @see {@linkcode ModuleId}
   *
   * @this {MatcherPatterns}
   *
   * @param {ModuleId} target
   *  The module id to check
   * @return {boolean}
   *  `true` if `target` ends with a specified extension, `false` otherwise
   */
  matchExtension(this: MatcherPatterns, target: ModuleId): boolean

  /**
   * Whether to treat filenames as case sensitive.
   */
  useCaseSensitiveFileNames: boolean
}

export type { MatcherPatterns as default }
