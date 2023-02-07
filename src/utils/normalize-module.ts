/**
 * @file Utilities - normalizeModule
 * @module tsconfig-utils/utils/normalizeModule
 */

import { getPropertyValue } from '#src/internal'
import { ModuleKind } from '@flex-development/tsconfig-types'
import { isString } from '@flex-development/tutils'
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
 * @return {ts.ModuleKind | undefined} `ts.ModuleKind` value or `undefined`
 */
const normalizeModule = (option: unknown): ts.ModuleKind | undefined => {
  // lowercase user option if it is a string
  if (isString(option)) option = option.toLowerCase()

  /**
   * TypeScript program compiler option value, if any.
   *
   * @var {ts.ModuleKind | undefined} ret
   */
  let ret: ts.ModuleKind | undefined

  // normalize user compiler option
  switch (option as ModuleKind | ts.ModuleKind) {
    case ModuleKind.AMD:
    case getPropertyValue(ts.ModuleKind, 'AMD'):
      ret = getPropertyValue(ts.ModuleKind, 'AMD')
      break
    case ModuleKind.CommonJS:
    case getPropertyValue(ts.ModuleKind, 'CommonJS'):
      ret = getPropertyValue(ts.ModuleKind, 'CommonJS')
      break
    case ModuleKind.ES6:
    case ModuleKind.ES2015:
    case getPropertyValue(ts.ModuleKind, 'ES6'):
    case getPropertyValue(ts.ModuleKind, 'ES2015'):
      ret = getPropertyValue(ts.ModuleKind, 'ES2015')
      break
    case ModuleKind.ES2020:
    case getPropertyValue(ts.ModuleKind, 'ES2020'):
      ret = getPropertyValue(ts.ModuleKind, 'ES2020')
      break
    case ModuleKind.ES2022:
    case getPropertyValue(ts.ModuleKind, 'ES2022'):
      ret = getPropertyValue(ts.ModuleKind, 'ES2022')
      break
    case ModuleKind.ESNext:
    case getPropertyValue(ts.ModuleKind, 'ESNext'):
      ret = getPropertyValue(ts.ModuleKind, 'ESNext')
      break
    case ModuleKind.Node16:
    case getPropertyValue(ts.ModuleKind, 'Node16'):
      ret = getPropertyValue(ts.ModuleKind, 'Node16')
      break
    case ModuleKind.NodeNext:
    case getPropertyValue(ts.ModuleKind, 'NodeNext'):
      ret = getPropertyValue(ts.ModuleKind, 'NodeNext')
      break
    case ModuleKind.None:
    case getPropertyValue(ts.ModuleKind, 'None'):
      ret = getPropertyValue(ts.ModuleKind, 'None')
      break
    case ModuleKind.System:
    case getPropertyValue(ts.ModuleKind, 'System'):
      ret = getPropertyValue(ts.ModuleKind, 'System')
      break
    case ModuleKind.UMD:
    case getPropertyValue(ts.ModuleKind, 'UMD'):
      ret = getPropertyValue(ts.ModuleKind, 'UMD')
      break
    default:
      break
  }

  return ret
}

export default normalizeModule
