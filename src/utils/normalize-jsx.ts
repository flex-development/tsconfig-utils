/**
 * @file Utilities - normalizeJsx
 * @module tsconfig-utils/utils/normalizeJsx
 */

import { getPropertyValue } from '#src/internal'
import { JsxEmit } from '@flex-development/tsconfig-types'
import ts from 'typescript'

/**
 * Converts the given `option` to a **programmatic** [`jsx`][1] value.
 *
 * TypeScript programs expect a {@linkcode ts.JsxEmit} value.
 *
 * If the `option` is already programmatic, it will be returned unmodified. If
 * it cannot be converted, `undefined` will be returned instead.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#jsx
 *
 * @param {unknown} option - Option to evaluate
 * @return {ts.JsxEmit | undefined} `ts.JsxEmit` value or `undefined`
 */
const normalizeJsx = (option: unknown): ts.JsxEmit | undefined => {
  /**
   * TypeScript program compiler option value, if any.
   *
   * @var {ts.JsxEmit | undefined} ret
   */
  let ret: ts.JsxEmit | undefined

  // normalize user compiler option
  switch (option as JsxEmit | ts.JsxEmit) {
    case getPropertyValue(ts.JsxEmit, 'None'):
      ret = getPropertyValue(ts.JsxEmit, 'None')
      break
    case JsxEmit.Preserve:
    case getPropertyValue(ts.JsxEmit, 'Preserve'):
      ret = getPropertyValue(ts.JsxEmit, 'Preserve')
      break
    case JsxEmit.React:
    case getPropertyValue(ts.JsxEmit, 'React'):
      ret = getPropertyValue(ts.JsxEmit, 'React')
      break
    case JsxEmit.ReactJSX:
    case getPropertyValue(ts.JsxEmit, 'ReactJSX'):
      ret = getPropertyValue(ts.JsxEmit, 'ReactJSX')
      break
    case JsxEmit.ReactJSXDev:
    case getPropertyValue(ts.JsxEmit, 'ReactJSXDev'):
      ret = getPropertyValue(ts.JsxEmit, 'ReactJSXDev')
      break
    case JsxEmit.ReactNative:
    case getPropertyValue(ts.JsxEmit, 'ReactNative'):
      ret = getPropertyValue(ts.JsxEmit, 'ReactNative')
      break
    default:
      break
  }

  return ret
}

export default normalizeJsx
