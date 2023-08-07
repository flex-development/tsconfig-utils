/**
 * @file Utilities - normalizeImportsNotUsed
 * @module tsconfig-utils/utils/normalizeImportsNotUsed
 */

import { ImportsNotUsedKind } from '@flex-development/tsconfig-types'
import {
  cast,
  isString,
  lowercase,
  type Optional
} from '@flex-development/tutils'
import ts from 'typescript'

/**
 * Converts the given `option` into a **programmatic**
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
 * @return {Optional<ts.ImportsNotUsedAsValues>} `ts.ImportsNotUsedAsValues`
 * value or `undefined`
 */
const normalizeImportsNotUsed = (
  option: unknown
): Optional<ts.ImportsNotUsedAsValues> => {
  // lowercase user option if it is a string
  if (isString(option)) option = lowercase(option)

  /**
   * TypeScript program compiler option value, if any.
   *
   * @var {Optional<ts.ImportsNotUsedAsValues>} ret
   */
  let ret: Optional<ts.ImportsNotUsedAsValues>

  // normalize user compiler option
  switch (cast<ImportsNotUsedKind | ts.ImportsNotUsedAsValues>(option)) {
    case ImportsNotUsedKind.Error:
    case ts.ImportsNotUsedAsValues.Error:
      ret = ts.ImportsNotUsedAsValues.Error
      break
    case ImportsNotUsedKind.Preserve:
    case ts.ImportsNotUsedAsValues.Preserve:
      ret = ts.ImportsNotUsedAsValues.Preserve
      break
    case ImportsNotUsedKind.Remove:
    case ts.ImportsNotUsedAsValues.Remove:
      ret = ts.ImportsNotUsedAsValues.Remove
      break
    default:
      break
  }

  return ret
}

export default normalizeImportsNotUsed
