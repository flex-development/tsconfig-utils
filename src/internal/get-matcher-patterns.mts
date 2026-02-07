/**
 * @file Internal - getMatcherPatterns
 * @module tsconfig-utils/internal/getMatcherPatterns
 */

import type MatcherPatterns from '#interfaces/matcher-patterns'
import type { ModuleId } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type { List } from '@flex-development/tsconfig-utils'

export { getMatcherPatterns as default, type MatcherType }

/**
 * Union of matcher types.
 *
 * @internal
 */
type MatcherType = 'directory' | 'file'

/**
 * Create a dictionary of patterns used to matching directories and files.
 *
 * @see {@linkcode List}
 * @see {@linkcode MatcherPatterns}
 *
 * @internal
 *
 * @this {void}
 *
 * @param {List<string> | null | undefined} extensions
 *  The list of file extensions to filter for
 * @param {List<string> | null | undefined} exclude
 *  The list of patterns used to exclude matches
 * @param {List<string> | null | undefined} include
 *  The list of patterns matching files to include
 * @param {boolean | null | undefined} [useCaseSensitiveFileNames]
 *  Whether to treat filenames as case sensitive
 * @return {MatcherPatterns}
 *  The matcher patterns dictionary
 */
function getMatcherPatterns(
  this: void,
  extensions: List<string> | null | undefined,
  exclude: List<string> | null | undefined,
  include: List<string> | null | undefined,
  useCaseSensitiveFileNames?: boolean | null | undefined
): MatcherPatterns {
  /**
   * The list of patterns matching subdirectories to search.
   *
   * @const {Set<string>} directoryInclude
   */
  const directoryInclude: Set<string> = new Set()

  /**
   * The list of patterns matching files to include.
   *
   * @const {Set<string>} fileInclude
   */
  const fileInclude: Set<string> = new Set()

  // store include patterns.
  if (include) {
    for (let pattern of include) {
      /**
       * The last segment of {@linkcode pattern}.
       *
       * @const {string} segment
       */
      const segment: string = pathe.basename(pattern)

      // if the last path segment in a pattern does not contain a file extension
      // or wildcard character (`*`), it will be considered a directory pattern.
      if (!pathe.extname(segment) && !segment.includes('*')) {
        directoryInclude.add(pattern)

        // add wildcard character to allow matches in subdirectories.
        pattern = pathe.join(pattern, '**')

        // add patterns to allow subdirectories to be searched.
        directoryInclude.add(pattern)
        fileInclude.add(pattern)
      } else {
        fileInclude.add(pattern)
      }
    }

    // add patterns matching directories to search.
    for (const pattern of fileInclude) {
      /**
       * The parent directory of the current include pattern.
       *
       * @var {string} dirname
       */
      let dirname: string = pathe.dirname(pattern)

      // store directory search patterns.
      while (dirname !== pathe.dot) {
        directoryInclude.add(dirname)
        dirname = pathe.dirname(dirname)
      }
    }
  }

  return {
    directoryInclude,
    exclude: new Set(exclude),
    fileInclude,

    /**
     * Check if `target` ends with an extension in `extensions`.
     *
     * @this {MatcherPatterns}
     *
     * @param {ModuleId} target
     *  The module id to check
     * @return {boolean}
     *  `true` if `target` ends with a specified extension, `false` otherwise
     */
    matchExtension(this: MatcherPatterns, target: ModuleId): boolean {
      return [...new Set(extensions)].map(pathe.formatExt).some(ext => {
        return String(target).endsWith(ext)
      })
    },

    useCaseSensitiveFileNames: !!useCaseSensitiveFileNames
  }
}
