/**
 * @file Utilities - normalizeModuleResolution
 * @module tsconfig-utils/utils/normalizeModuleResolution
 */

import { getPropertyValue } from '#src/internal'
import { ModuleResolutionKind } from '@flex-development/tsconfig-types'
import { isString } from '@flex-development/tutils'
import ts from 'typescript'

/**
 * Converts the given `option` into a **programmatic** [`moduleResolution`][1]
 * option.
 *
 * TypeScript programs expect a {@linkcode ts.ModuleResolutionKind} value.
 *
 * If the `option` is already programmatic, it will be returned unmodified. If
 * it cannot be converted, `undefined` will be returned instead.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#moduleResolution
 *
 * @param {unknown} option - Option to evaluate
 * @return {ts.ModuleResolutionKind | undefined} `ts.ModuleResolutionKind` value
 * or `undefined`
 */
const normalizeModuleResolution = (
  option: unknown
): ts.ModuleResolutionKind | undefined => {
  // lowercase user option if it is a string
  if (isString(option)) option = option.toLowerCase()

  /**
   * TypeScript program compiler option value, if any.
   *
   * @var {ts.ModuleResolutionKind | undefined} ret
   */
  let ret: ts.ModuleResolutionKind | undefined

  // normalize user compiler option
  switch (option as ModuleResolutionKind | ts.ModuleResolutionKind) {
    case ModuleResolutionKind.Bundler:
    case getPropertyValue(ts.ModuleResolutionKind, 'Bundler'):
      ret = getPropertyValue(ts.ModuleResolutionKind, 'Bundler') as typeof ret
      break
    case ModuleResolutionKind.Classic:
    case getPropertyValue(ts.ModuleResolutionKind, 'Classic'):
      ret = getPropertyValue(ts.ModuleResolutionKind, 'Classic')
      break
    case ModuleResolutionKind.Node10:
    case getPropertyValue(ts.ModuleResolutionKind, 'Node10'):
      ret = getPropertyValue(ts.ModuleResolutionKind, 'Node10') as typeof ret
      break
    case ModuleResolutionKind.Node16:
    case getPropertyValue(ts.ModuleResolutionKind, 'Node16'):
      ret = getPropertyValue(ts.ModuleResolutionKind, 'Node16')
      break
    case ModuleResolutionKind.NodeJs:
    case getPropertyValue(ts.ModuleResolutionKind, 'NodeJs'):
      ret = getPropertyValue(ts.ModuleResolutionKind, 'NodeJs') as typeof ret
      break
    case ModuleResolutionKind.NodeNext:
    case getPropertyValue(ts.ModuleResolutionKind, 'NodeNext'):
      ret = getPropertyValue(ts.ModuleResolutionKind, 'NodeNext')
      break
    default:
      break
  }

  return ret
}

export default normalizeModuleResolution
