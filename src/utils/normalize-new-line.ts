/**
 * @file Utilities - normalizeNewLine
 * @module tsconfig-utils/utils/normalizeNewLine
 */

import { getPropertyValue } from '#src/internal'
import { NewLineKind } from '@flex-development/tsconfig-types'
import { isString } from '@flex-development/tutils'
import ts from 'typescript'

/**
 * Converts the given `option` to a **programmatic** [`newLine`][1] option.
 *
 * TypeScript programs expect a {@linkcode ts.NewLineKind} value.
 *
 * If the `option` is already programmatic, it will be returned unmodified. If
 * it cannot be converted, `undefined` will be returned instead.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#newLine
 *
 * @param {unknown} option - Option to evaluate
 * @return {ts.NewLineKind | undefined} `ts.NewLineKind` value or `undefined`
 */
const normalizeNewLine = (option: unknown): ts.NewLineKind | undefined => {
  // lowercase user option if it is a string
  if (isString(option)) option = option.toLowerCase()

  /**
   * TypeScript program compiler option value, if any.
   *
   * @var {ts.NewLineKind | undefined} ret
   */
  let ret: ts.NewLineKind | undefined

  // normalize user compiler option
  switch (option as NewLineKind | ts.NewLineKind) {
    case NewLineKind.CarriageReturnLineFeed:
    case getPropertyValue(ts.NewLineKind, 'CarriageReturnLineFeed'):
      ret = getPropertyValue(ts.NewLineKind, 'CarriageReturnLineFeed')
      break
    case NewLineKind.LineFeed:
    case getPropertyValue(ts.NewLineKind, 'LineFeed'):
      ret = getPropertyValue(ts.NewLineKind, 'LineFeed')
      break
    default:
      break
  }

  return ret
}

export default normalizeNewLine
