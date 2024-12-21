/**
 * @file Internal - withTrailingSlash
 * @module tsconfig-utils/internal/withTrailingSlash
 */

import pathe from '@flex-development/pathe'

export default withTrailingSlash

/**
 * Ensure `url.href` and `url.pathname` end with a single trailing slash.
 *
 * @internal
 *
 * @param {URL} url
 *  URL to handle
 * @return {URL}
 *  `url`
 */
function withTrailingSlash(url: URL): URL

/**
 * Ensure `str` ends with a single trailing slash.
 *
 * @internal
 *
 * @param {string} str
 *  String to handle
 * @return {string}
 *  `str`
 */
function withTrailingSlash(str: string): string

/**
 * If `value` is a string, ensure `value` ends with a single trailing slash.\
 * Otherwise, ensure `value.href` and `value.pathname` end with a single
 * trailing slash.
 *
 * @internal
 *
 * @param {URL | string} value
 *  URL or string to handle
 * @return {URL | string}
 *  `value`
 */
function withTrailingSlash(value: URL | string): URL | string

/**
 * Ensure `value` ends with a single trailing slash.
 *
 * @internal
 *
 * @param {URL | string} value
 *  URL or string to handle
 * @return {URL | string}
 *  `value`
 */
function withTrailingSlash(value: URL | string): URL | string {
  if (typeof value === 'string') {
    value = value.replace(/[/\\]+$/, '') + pathe.sep
  } else {
    value.href = withTrailingSlash(value.href)
  }

  return value
}
