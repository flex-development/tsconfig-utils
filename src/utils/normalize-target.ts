/**
 * @file Utilities - normalizeTarget
 * @module tsconfig-utils/utils/normalizeTarget
 */

import { getPropertyValue } from '#src/internal'
import { ScriptTarget } from '@flex-development/tsconfig-types'
import { isString } from '@flex-development/tutils'
import ts from 'typescript'

/**
 * Converts the given `option` to a **programmatic** [`target`][1] option.
 *
 * TypeScript programs expect a {@linkcode ts.ScriptTarget} value.
 *
 * If the `option` is already programmatic, it will be returned unmodified. If
 * it cannot be converted, `undefined` will be returned instead.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#target
 *
 * @param {unknown} option - Option to evaluate
 * @return {ts.ScriptTarget | undefined} `ts.ScriptTarget` value or `undefined`
 */
const normalizeTarget = (option: unknown): ts.ScriptTarget | undefined => {
  // lowercase user option if it is a string
  if (isString(option)) option = option.toLowerCase()

  /**
   * TypeScript program compiler option value, if any.
   *
   * @var {ts.ScriptTarget | undefined} ret
   */
  let ret: ts.ScriptTarget | undefined

  // normalize user compiler option
  switch (option as ScriptTarget | ts.ScriptTarget) {
    case ScriptTarget.ES3:
    case getPropertyValue(ts.ScriptTarget, 'ES3'):
      ret = getPropertyValue(ts.ScriptTarget, 'ES3')
      break
    case ScriptTarget.ES5:
    case getPropertyValue(ts.ScriptTarget, 'ES5'):
      ret = getPropertyValue(ts.ScriptTarget, 'ES5')
      break
    case ScriptTarget.ES6:
    case ScriptTarget.ES2015:
    case getPropertyValue(ts.ScriptTarget, 'ES6'):
    case getPropertyValue(ts.ScriptTarget, 'ES2015'):
      ret = getPropertyValue(ts.ScriptTarget, 'ES2015')
      break
    case ScriptTarget.ES2016:
    case getPropertyValue(ts.ScriptTarget, 'ES2016'):
      ret = getPropertyValue(ts.ScriptTarget, 'ES2016')
      break
    case ScriptTarget.ES2017:
    case getPropertyValue(ts.ScriptTarget, 'ES2017'):
      ret = getPropertyValue(ts.ScriptTarget, 'ES2017')
      break
    case ScriptTarget.ES2018:
    case getPropertyValue(ts.ScriptTarget, 'ES2018'):
      ret = getPropertyValue(ts.ScriptTarget, 'ES2018')
      break
    case ScriptTarget.ES2019:
    case getPropertyValue(ts.ScriptTarget, 'ES2019'):
      ret = getPropertyValue(ts.ScriptTarget, 'ES2019')
      break
    case ScriptTarget.ES2020:
    case getPropertyValue(ts.ScriptTarget, 'ES2020'):
      ret = getPropertyValue(ts.ScriptTarget, 'ES2020')
      break
    case ScriptTarget.ES2021:
    case getPropertyValue(ts.ScriptTarget, 'ES2021'):
      ret = getPropertyValue(ts.ScriptTarget, 'ES2021')
      break
    case ScriptTarget.ES2022:
    case getPropertyValue(ts.ScriptTarget, 'ES2022'):
      ret = getPropertyValue(ts.ScriptTarget, 'ES2022')
      break
    case ScriptTarget.ESNext:
    case getPropertyValue(ts.ScriptTarget, 'ESNext'):
      ret = getPropertyValue(ts.ScriptTarget, 'ESNext')
      break
    case getPropertyValue(ts.ScriptTarget, 'JSON'):
      ret = getPropertyValue(ts.ScriptTarget, 'JSON')
      break
    default:
      break
  }

  return ret
}

export default normalizeTarget
