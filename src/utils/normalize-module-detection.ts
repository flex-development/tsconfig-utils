/**
 * @file Utilities - normalizeModuleDetection
 * @module tsconfig-utils/utils/normalizeModuleDetection
 */

import { getPropertyValue } from '#src/internal'
import { ModuleDetectionKind } from '@flex-development/tsconfig-types'
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
 * @return {ts.ModuleDetectionKind | undefined} `ts.ModuleDetectionKind` value
 * or `undefined`
 */
const normalizeModuleDetection = (
  option: unknown
): ts.ModuleDetectionKind | undefined => {
  /**
   * TypeScript program compiler option value, if any.
   *
   * @var {ts.ModuleDetectionKind | undefined} ret
   */
  let ret: ts.ModuleDetectionKind | undefined

  // normalize user compiler option
  switch (option as ModuleDetectionKind | ts.ModuleDetectionKind) {
    case ModuleDetectionKind.Auto:
    case getPropertyValue(ts.ModuleDetectionKind, 'Auto'):
      ret = getPropertyValue(ts.ModuleDetectionKind, 'Auto')
      break
    case ModuleDetectionKind.Force:
    case getPropertyValue(ts.ModuleDetectionKind, 'Force'):
      ret = getPropertyValue(ts.ModuleDetectionKind, 'Force')
      break
    case ModuleDetectionKind.Legacy:
    case getPropertyValue(ts.ModuleDetectionKind, 'Legacy'):
      ret = getPropertyValue(ts.ModuleDetectionKind, 'Legacy')
      break
    default:
      break
  }

  return ret
}

export default normalizeModuleDetection
