/**
 * @file Utilities - normalizeJsx
 * @module tsconfig-utils/utils/normalizeJsx
 */

import { JsxEmit } from '@flex-development/tsconfig-types'
import { cast, type Optional } from '@flex-development/tutils'
import ts from 'typescript'

/**
 * Converts the given `option` into a **programmatic** [`jsx`][1] value.
 *
 * TypeScript programs expect a {@linkcode ts.JsxEmit} value.
 *
 * If the `option` is already programmatic, it will be returned unmodified. If
 * it cannot be converted, `undefined` will be returned instead.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#jsx
 *
 * @param {unknown} option - Option to evaluate
 * @return {Optional<ts.JsxEmit>} `ts.JsxEmit` value or `undefined`
 */
const normalizeJsx = (option: unknown): Optional<ts.JsxEmit> => {
  /**
   * TypeScript program compiler option value, if any.
   *
   * @var {Optional<ts.JsxEmit>} ret
   */
  let ret: Optional<ts.JsxEmit>

  // normalize user compiler option
  switch (cast<JsxEmit | ts.JsxEmit>(option)) {
    case ts.JsxEmit.None:
      ret = ts.JsxEmit.None
      break
    case JsxEmit.Preserve:
    case ts.JsxEmit.Preserve:
      ret = ts.JsxEmit.Preserve
      break
    case JsxEmit.React:
    case ts.JsxEmit.React:
      ret = ts.JsxEmit.React
      break
    case JsxEmit.ReactJSX:
    case ts.JsxEmit.ReactJSX:
      ret = ts.JsxEmit.ReactJSX
      break
    case JsxEmit.ReactJSXDev:
    case ts.JsxEmit.ReactJSXDev:
      ret = ts.JsxEmit.ReactJSXDev
      break
    case JsxEmit.ReactNative:
    case ts.JsxEmit.ReactNative:
      ret = ts.JsxEmit.ReactNative
      break
    default:
      break
  }

  return ret
}

export default normalizeJsx
