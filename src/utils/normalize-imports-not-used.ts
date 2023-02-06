/**
 * @file Utilities - normalizeImportsNotUsed
 * @module tsconfig-utils/utils/normalizeImportsNotUsed
 */

import { getPropertyValue } from '#src/internal'
import { ImportsNotUsedKind } from '@flex-development/tsconfig-types'
import { isString } from '@flex-development/tutils'
import ts from 'typescript'

/**
 * Converts the given `option` to a **programmatic**
 * [`importsNotUsedAsValues`][1] option.
 *
 * TypeScript programs expect a {@linkcode ts.ImportsNotUsedAsValues} value.
 *
 * If the `option` is already programmatic, it will be returned unmodified. If
 * it cannot be converted, `undefined` will be returned instead.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#importsNotUsedAsValues
 *
 * @param {unknown} option - Option to evaluate
 * @return {ts.ImportsNotUsedAsValues | undefined} `ts.ImportsNotUsedAsValues`
 * value or `undefined`
 */
const normalizeImportsNotUsed = (
  option: unknown
): ts.ImportsNotUsedAsValues | undefined => {
  // lowercase user option if it is a string
  if (isString(option)) option = option.toLowerCase()

  /**
   * TypeScript program compiler option value, if any.
   *
   * @var {ts.ImportsNotUsedAsValues | undefined} ret
   */
  let ret: ts.ImportsNotUsedAsValues | undefined

  // normalize user compiler option
  switch (option as ImportsNotUsedKind | ts.ImportsNotUsedAsValues) {
    case ImportsNotUsedKind.Error:
    case getPropertyValue(ts.ImportsNotUsedAsValues, 'Error'):
      ret = getPropertyValue(ts.ImportsNotUsedAsValues, 'Error')
      break
    case ImportsNotUsedKind.Preserve:
    case getPropertyValue(ts.ImportsNotUsedAsValues, 'Preserve'):
      ret = getPropertyValue(ts.ImportsNotUsedAsValues, 'Preserve')
      break
    case ImportsNotUsedKind.Remove:
    case getPropertyValue(ts.ImportsNotUsedAsValues, 'Remove'):
      ret = getPropertyValue(ts.ImportsNotUsedAsValues, 'Remove')
      break
    default:
      break
  }

  return ret
}

export default normalizeImportsNotUsed
