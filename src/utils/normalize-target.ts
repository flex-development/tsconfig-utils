/**
 * @file Utilities - normalizeTarget
 * @module tsconfig-utils/utils/normalizeTarget
 */

import { ScriptTarget } from '@flex-development/tsconfig-types'
import {
  cast,
  get,
  isString,
  lowercase,
  type Optional
} from '@flex-development/tutils'
import ts from 'typescript'

/**
 * Converts the given `option` into a **programmatic** [`target`][1] option.
 *
 * TypeScript programs expect a {@linkcode ts.ScriptTarget} value.
 *
 * If the `option` is already programmatic, it will be returned unmodified. If
 * it cannot be converted, `undefined` will be returned instead.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#target
 *
 * @param {unknown} option - Option to evaluate
 * @return {Optional<ts.ScriptTarget>} `ts.ScriptTarget` value or `undefined`
 */
const normalizeTarget = (option: unknown): Optional<ts.ScriptTarget> => {
  // lowercase user option if it is a string
  if (isString(option)) option = lowercase(option)

  /**
   * TypeScript program compiler option value, if any.
   *
   * @var {Optional<ts.ScriptTarget>} ret
   */
  let ret: Optional<ts.ScriptTarget>

  // normalize user compiler option
  switch (cast<ScriptTarget | ts.ScriptTarget>(option)) {
    case ScriptTarget.ES3:
    case ts.ScriptTarget.ES3:
      ret = ts.ScriptTarget.ES3
      break
    case ScriptTarget.ES5:
    case ts.ScriptTarget.ES5:
      ret = ts.ScriptTarget.ES5
      break
    case ScriptTarget.ES6:
    case ScriptTarget.ES2015:
    case get(ts.ScriptTarget, 'ES6', Number.NaN):
    case ts.ScriptTarget.ES2015:
      ret = ts.ScriptTarget.ES2015
      break
    case ScriptTarget.ES2016:
    case ts.ScriptTarget.ES2016:
      ret = ts.ScriptTarget.ES2016
      break
    case ScriptTarget.ES2017:
    case ts.ScriptTarget.ES2017:
      ret = ts.ScriptTarget.ES2017
      break
    case ScriptTarget.ES2018:
    case ts.ScriptTarget.ES2018:
      ret = ts.ScriptTarget.ES2018
      break
    case ScriptTarget.ES2019:
    case ts.ScriptTarget.ES2019:
      ret = ts.ScriptTarget.ES2019
      break
    case ScriptTarget.ES2020:
    case ts.ScriptTarget.ES2020:
      ret = ts.ScriptTarget.ES2020
      break
    case ScriptTarget.ES2021:
    case ts.ScriptTarget.ES2021:
      ret = ts.ScriptTarget.ES2021
      break
    case ScriptTarget.ES2022:
    case ts.ScriptTarget.ES2022:
      ret = ts.ScriptTarget.ES2022
      break
    case ScriptTarget.ESNext:
    case ts.ScriptTarget.ESNext:
      ret = ts.ScriptTarget.ESNext
      break
    case ts.ScriptTarget.JSON:
      ret = ts.ScriptTarget.JSON
      break
    default:
      break
  }

  return ret
}

export default normalizeTarget
