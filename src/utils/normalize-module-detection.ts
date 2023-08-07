/**
 * @file Utilities - normalizeModuleDetection
 * @module tsconfig-utils/utils/normalizeModuleDetection
 */

import { ModuleDetectionKind } from '@flex-development/tsconfig-types'
import { cast, type Optional } from '@flex-development/tutils'
import ts from 'typescript'

/**
 * Converts the given `option` into a **programmatic** [`moduleDetection`][1]
 * option.
 *
 * TypeScript programs expect a {@linkcode ts.ModuleDetectionKind} value.
 *
 * If the `option` is already programmatic, it will be returned unmodified. If
 * it cannot be converted, `undefined` will be returned instead.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#moduleDetection
 *
 * @param {unknown} option - Option to evaluate
 * @return {Optional<ts.ModuleDetectionKind>} `ts.ModuleDetectionKind` value
 * or `undefined`
 */
const normalizeModuleDetection = (
  option: unknown
): Optional<ts.ModuleDetectionKind> => {
  /**
   * TypeScript program compiler option value, if any.
   *
   * @var {Optional<ts.ModuleDetectionKind>} ret
   */
  let ret: Optional<ts.ModuleDetectionKind>

  // normalize user compiler option
  switch (cast<ModuleDetectionKind | ts.ModuleDetectionKind>(option)) {
    case ModuleDetectionKind.Auto:
    case ts.ModuleDetectionKind.Auto:
      ret = ts.ModuleDetectionKind.Auto
      break
    case ModuleDetectionKind.Force:
    case ts.ModuleDetectionKind.Force:
      ret = ts.ModuleDetectionKind.Force
      break
    case ModuleDetectionKind.Legacy:
    case ts.ModuleDetectionKind.Legacy:
      ret = ts.ModuleDetectionKind.Legacy
      break
    default:
      break
  }

  return ret
}

export default normalizeModuleDetection
