/**
 * @file createGetCanonicalFileName
 * @module tsconfig-utils/lib/createGetCanonicalFileName
 */

import toPath from '#internal/to-path'
import type { ModuleId } from '@flex-development/mlly'
import type { GetCanonicalFileName } from '@flex-development/tsconfig-utils'
import { lowercase } from '@flex-development/tutils'

/**
 * Create a canonical file path function.
 *
 * @see {@linkcode GetCanonicalFileName}
 *
 * @this {void}
 *
 * @param {boolean | null | undefined} [useCaseSensitiveFileNames]
 *  Treat filenames as case-sensitive?
 * @return {GetCanonicalFileName}
 *  Function to get the canonical filename of a path or `file:` URL
 */
function createGetCanonicalFileName(
  this: void,
  useCaseSensitiveFileNames?: boolean | null | undefined
): GetCanonicalFileName {
  return getCanonicalFileName

  /**
   * Get the canonical filename of `id`.
   *
   * @see https://github.com/microsoft/TypeScript/blob/v5.7.2/src/compiler/core.ts#L1839-L1879
   *
   * @this {void}
   *
   * @param {ModuleId} id
   *  The path or `file:` URL to handle
   * @return {string}
   *  Canonical filename of `id`
   */
  function getCanonicalFileName(this: void, id: ModuleId): string {
    /**
     * Canonical path of {@linkcode id}.
     *
     * @var {string} canonical
     */
    let canonical: string = toPath(id)

    if (!useCaseSensitiveFileNames) {
      /**
       * Regular expression matching characters in {@linkcode canonical} that
       * should be converted to lowercase.
       *
       * @const {RegExp} toLowercase
       */
      // eslint-disable-next-line unicorn/better-regex
      const toLowercase: RegExp = /[^\u0130\u0131\u00DFa-z0-9\\/:\-_. ]+/g

      canonical = canonical.replaceAll(toLowercase, lowercase)
    }

    return canonical
  }
}

export default createGetCanonicalFileName
