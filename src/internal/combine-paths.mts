/**
 * @file Internal - combinePaths
 * @module tsconfig-utils/internal/combinePaths
 */

import withTrailingSlash from '#internal/with-trailing-slash'
import pathe from '@flex-development/pathe'

/**
 * Combine paths into a single path.
 *
 * If a path is absolute, it replaces any previous path.
 * Relative paths are not simplified.
 *
 * @see https://github.com/microsoft/TypeScript/blob/v5.7.2/src/compiler/path.ts#L579
 *
 * @example
 *  combinePaths('/path', '/to', 'file.ext')
 *  // /to/file.ext
 * @example
 *  combinePaths('/path', 'to', 'file.ext')
 *  // /path/to/file.ext
 * @example
 *  combinePaths('c:/path', 'c:/to', 'file.ext')
 *  // c:/to/file.ext
 * @example
 *  combinePaths('c:/path', 'to', 'file.ext')
 *  // c:/path/to/file.ext
 * @example
 *  combinePaths('file:///path', 'file:///to', 'file.ext')
 *  // file:///to/file.ext
 * @example
 *  combinePaths('file:///path', 'to', 'file.ext')
 *  // file:///path/to/file.ext
 * @example
 *  combinePaths('path', 'dir', '..', 'to', 'file.ext')
 *  // path/dir/../to/file.ext
 * @example
 *  combinePaths(null, 'path', 'to', undefined, 'file.ext')
 *  // path/to/file.ext
 *
 * @internal
 *
 * @this {void}
 *
 * @param {string | null | undefined} path
 *  The initial path
 * @return {string}
 *  The combined path
 */
function combinePaths(
  this: void,
  path: string | null | undefined,
  ...paths: (string | null | undefined)[]
): string {
  path ??= ''
  if (path) path = pathe.toPosix(path)

  for (let p of paths) {
    if (!p) continue
    p = pathe.toPosix(p)
    path = !path || pathe.root(p).length ? p : withTrailingSlash(path) + p
  }

  return path
}

export default combinePaths
