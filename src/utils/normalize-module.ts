/**
 * @file Utilities - normalizeModule
 * @module tsconfig-utils/utils/normalizeModule
 */

import { ModuleKind } from '@flex-development/tsconfig-types'
import {
  cast,
  get,
  isString,
  lowercase,
  type Optional
} from '@flex-development/tutils'
import ts from 'typescript'

/**
 * Converts the given `option` into a **programmatic** [`module`][1] option.
 *
 * TypeScript programs expect a {@linkcode ts.ModuleKind} value.
 *
 * If the `option` is already programmatic, it will be returned unmodified. If
 * it cannot be converted, `undefined` will be returned instead.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#module
 *
 * @param {unknown} option - Option to evaluate
 * @return {Optional<ts.ModuleKind>} `ts.ModuleKind` value or `undefined`
 */
const normalizeModule = (option: unknown): Optional<ts.ModuleKind> => {
  // lowercase user option if it is a string
  if (isString(option)) option = lowercase(option)

  /**
   * TypeScript program compiler option value, if any.
   *
   * @var {Optional<ts.ModuleKind>} ret
   */
  let ret: Optional<ts.ModuleKind>

  // normalize user compiler option
  switch (cast<ModuleKind | ts.ModuleKind>(option)) {
    case ModuleKind.AMD:
    case ts.ModuleKind.AMD:
      ret = ts.ModuleKind.AMD
      break
    case ModuleKind.CommonJS:
    case ts.ModuleKind.CommonJS:
      ret = ts.ModuleKind.CommonJS
      break
    case ModuleKind.ES6:
    case ModuleKind.ES2015:
    case get(ts.ModuleKind, 'ES6', Number.NaN):
    case ts.ModuleKind.ES2015:
      ret = ts.ModuleKind.ES2015
      break
    case ModuleKind.ES2020:
    case ts.ModuleKind.ES2020:
      ret = ts.ModuleKind.ES2020
      break
    case ModuleKind.ES2022:
    case ts.ModuleKind.ES2022:
      ret = ts.ModuleKind.ES2022
      break
    case ModuleKind.ESNext:
    case ts.ModuleKind.ESNext:
      ret = ts.ModuleKind.ESNext
      break
    case ModuleKind.Node16:
    case ts.ModuleKind.Node16:
      ret = ts.ModuleKind.Node16
      break
    case ModuleKind.NodeNext:
    case ts.ModuleKind.NodeNext:
      ret = ts.ModuleKind.NodeNext
      break
    case ModuleKind.None:
    case ts.ModuleKind.None:
      ret = ts.ModuleKind.None
      break
    case ModuleKind.System:
    case ts.ModuleKind.System:
      ret = ts.ModuleKind.System
      break
    case ModuleKind.UMD:
    case ts.ModuleKind.UMD:
      ret = ts.ModuleKind.UMD
      break
    default:
      break
  }

  return ret
}

export default normalizeModule
