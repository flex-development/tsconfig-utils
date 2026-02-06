/**
 * @file createGetCanonicalFileName
 * @module tsconfig-utils/lib/createGetCanonicalFileName
 */

import type { ModuleId } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type {
  GetCanonicalFileName,
  UseCaseSensitiveFileNames
} from '@flex-development/tsconfig-utils'
import { lowercase } from '@flex-development/tutils'

/**
 * Create a canonical file name function.
 *
 * @see {@linkcode GetCanonicalFileName}
 * @see {@linkcode UseCaseSensitiveFileNames}
 *
 * @this {void}
 *
 * @param {UseCaseSensitiveFileNames} [useCaseSensitiveFileNames]
 *  Whether to treat filenames as case-sensitive
 * @return {GetCanonicalFileName}
 *  A function that returns a canonical file name given a module id
 */
function createGetCanonicalFileName(
  this: void,
  useCaseSensitiveFileNames?: UseCaseSensitiveFileNames
): GetCanonicalFileName {
  return getCanonicalFileName

  /**
   * @see https://github.com/microsoft/TypeScript/blob/v5.7.2/src/compiler/core.ts#L1839-L1879
   *
   * @this {void}
   *
   * @param {ModuleId} id
   *  The module id
   * @return {string}
   *  The canonical file name
   */
  function getCanonicalFileName(this: void, id: ModuleId): string {
    /**
     * The canonical file name.
     *
     * @var {string} canonical
     */
    let canonical: string = pathe.toPath(id)

    /**
     * Whether to treat file names as case sensitive.
     *
     * @var {boolean} caseSensitive
     */
    let caseSensitive: boolean = !!useCaseSensitiveFileNames

    // determine if file names should be treated as case sensitive.
    if (typeof useCaseSensitiveFileNames === 'function') {
      caseSensitive = !!useCaseSensitiveFileNames()
    }

    // convert all characters in `canonical` to lowercase.
    if (!caseSensitive) {
      canonical = canonical.replaceAll(
        // eslint-disable-next-line unicorn/better-regex
        /[^\u0130\u0131\u00DFa-z0-9\\/:\-_. ]+/g,
        lowercase
      )
    }

    return canonical
  }
}

export default createGetCanonicalFileName
