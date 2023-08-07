/**
 * @file Utilities - normalizeNewLine
 * @module tsconfig-utils/utils/normalizeNewLine
 */

import { NewLineKind } from '@flex-development/tsconfig-types'
import {
  cast,
  isString,
  lowercase,
  type Optional
} from '@flex-development/tutils'
import ts from 'typescript'

/**
 * Converts the given `option` into a **programmatic** [`newLine`][1] option.
 *
 * TypeScript programs expect a {@linkcode ts.NewLineKind} value.
 *
 * If the `option` is already programmatic, it will be returned unmodified. If
 * it cannot be converted, `undefined` will be returned instead.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#newLine
 *
 * @param {unknown} option - Option to evaluate
 * @return {Optional<ts.NewLineKind>} `ts.NewLineKind` value or `undefined`
 */
const normalizeNewLine = (option: unknown): Optional<ts.NewLineKind> => {
  // lowercase user option if it is a string
  if (isString(option)) option = lowercase(option)

  /**
   * TypeScript program compiler option value, if any.
   *
   * @var {Optional<ts.NewLineKind>} ret
   */
  let ret: Optional<ts.NewLineKind>

  // normalize user compiler option
  switch (cast<NewLineKind | ts.NewLineKind>(option)) {
    case NewLineKind.CarriageReturnLineFeed:
    case ts.NewLineKind.CarriageReturnLineFeed:
      ret = ts.NewLineKind.CarriageReturnLineFeed
      break
    case NewLineKind.LineFeed:
    case ts.NewLineKind.LineFeed:
      ret = ts.NewLineKind.LineFeed
      break
    default:
      break
  }

  return ret
}

export default normalizeNewLine
