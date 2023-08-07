/**
 * @file Internal - parseJSON
 * @module tsconfig-utils/internal/parseJSON
 */

import { cast, type JsonValue } from '@flex-development/tutils'
import stripBom from 'strip-bom'
import stripComments from 'strip-json-comments'
import validateString from './validate-string'

/**
 * Parses a JSON string.
 *
 * Strips comments and [UTF-8 byte order marks (BOM)][1] before parsing.
 *
 * [1]: https://en.wikipedia.org/wiki/Byte_order_mark#UTF-8
 *
 * @template T - Parsed JSON value type
 *
 * @param {string} json - JSON string to parse
 * @return {T} Parsed JSON value
 */
const parseJSON = <T extends JsonValue>(json: string): T => {
  validateString(json, 'json')
  return cast(JSON.parse(stripComments(stripBom(json), { whitespace: false })))
}

export default parseJSON
