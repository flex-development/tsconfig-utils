/**
 * @file Utilities - normalizeModuleResolution
 * @module tsconfig-utils/utils/normalizeModuleResolution
 */

import { ModuleResolutionKind } from '@flex-development/tsconfig-types'
import {
  cast,
  descriptor,
  get,
  isString,
  lowercase,
  type Optional
} from '@flex-development/tutils'
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
 * @return {Optional<ts.ModuleResolutionKind>} `ts.ModuleResolutionKind` value
 * or `undefined`
 */
const normalizeModuleResolution = (
  option: unknown
): Optional<ts.ModuleResolutionKind> => {
  // lowercase user option if it is a string
  if (isString(option)) option = lowercase(option)

  /**
   * TypeScript program compiler option value, if any.
   *
   * @var {Optional<ts.ModuleResolutionKind>} ret
   */
  let ret: Optional<ts.ModuleResolutionKind>

  // normalize user compiler option
  switch (cast<ModuleResolutionKind | ts.ModuleResolutionKind>(option)) {
    case ModuleResolutionKind.Bundler:
    case get(ts.ModuleResolutionKind, 'Bundler', Number.NaN):
      ret = cast(descriptor(ts.ModuleResolutionKind, 'Bundler').value)
      break
    case ModuleResolutionKind.Classic:
    case ts.ModuleResolutionKind.Classic:
      ret = ts.ModuleResolutionKind.Classic
      break
    case ModuleResolutionKind.Node10:
    case get(ts.ModuleResolutionKind, 'Node10', Number.NaN):
      ret = cast(descriptor(ts.ModuleResolutionKind, 'Node10').value)
      break
    case ModuleResolutionKind.Node16:
    case ts.ModuleResolutionKind.Node16:
      ret = ts.ModuleResolutionKind.Node16
      break
    case ModuleResolutionKind.NodeJs:
    case descriptor(ts.ModuleResolutionKind, 'NodeJs').value:
      ret = cast(descriptor(ts.ModuleResolutionKind, 'NodeJs').value)
      break
    case ModuleResolutionKind.NodeNext:
    case ts.ModuleResolutionKind.NodeNext:
      ret = ts.ModuleResolutionKind.NodeNext
      break
    default:
      break
  }

  return ret
}

export default normalizeModuleResolution
