/**
 * @file Internal - normalizeRelativePaths
 * @module tsconfig-utils/internal/normalizeRelativePaths
 */

import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type { JsonValue } from '@flex-development/tsconfig-types'
import { ok } from 'devlop'

/**
 * Normalize relative paths in `value`.
 *
 * Paths will starts with a dot character (`'.'`) and be relative to `url`.
 *
 * @internal
 *
 * @template {JsonValue | undefined} T
 *  The base tsconfig value
 *
 * @this {void}
 *
 * @param {URL} url
 *  The URL of the inheriting tsconfig
 * @param {URL} parent
 *  The URL of the base tsconfig
 * @param {T} value
 *  The base tsconfig value
 * @param {string | null} key
 *  The current property path
 * @param {Set<string>} paths
 *  The list of property paths where the value may be a relative path
 * @return {T}
 *  The `value` with normalized relative paths
 */
function normalizeRelativePaths<T extends JsonValue | undefined>(
  this: void,
  url: URL,
  parent: URL,
  value: T,
  key: string | null,
  paths: Set<string>
): T {
  if (
    key !== null &&
    paths.has(key) &&
    typeof value === 'string' &&
    !value.startsWith('*') &&
    !pathe.isURL(value) &&
    !pathe.isAbsolute(value) &&
    // skip paths that already look normalized.
    !(url.href === parent.href && mlly.isRelativeSpecifier(value))
  ) {
    return mlly.toRelativeSpecifier(new URL(value, parent), url) as T
  }

  if (Array.isArray(value)) {
    ok(key !== null, 'expected `key` to not to be `null`')

    return value.map(val => {
      return normalizeRelativePaths(
        url,
        parent,
        val,
        key + pathe.dot + '*',
        paths
      )
    }) as T
  }

  if (typeof value === 'object' && value !== null) {
    for (const [k, val] of Object.entries(value)) {
      value[k] = normalizeRelativePaths(
        url,
        parent,
        val,
        key === null
          ? k
          : pathe.addExt(
            key,
            pathe.extname(key) === pathe.dot + 'paths' ? '*' : k
          ),
        paths
      )
    }
  }

  return value
}

export default normalizeRelativePaths
