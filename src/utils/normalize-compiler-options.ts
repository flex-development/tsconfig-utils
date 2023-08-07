/**
 * @file Utilities - normalizeCompilerOptions
 * @module tsconfig-utils/utils/normalizeCompilerOptions
 */

import type { CompilerOptions } from '@flex-development/tsconfig-types'
import {
  cast,
  entries,
  isNIL,
  isObjectCurly,
  ksort,
  set
} from '@flex-development/tutils'
import type ts from 'typescript'
import COMPILER_OPTIONS from './compiler-options'
import normalizeImportsNotUsed from './normalize-imports-not-used'
import normalizeJsx from './normalize-jsx'
import normalizeLib from './normalize-lib'
import normalizeModule from './normalize-module'
import normalizeModuleDetection from './normalize-module-detection'
import normalizeModuleResolution from './normalize-module-resolution'
import normalizeNewLine from './normalize-new-line'
import normalizeTarget from './normalize-target'

/**
 * Converts the given [`compilerOptions`][1] into **programmatic** compiler
 * options.
 *
 * TypeScript programs expect compiler option objects to use enum values where
 * appropriate.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#compilerOptions
 *
 * @param {unknown} compilerOptions - User compiler options
 * @return {ts.CompilerOptions} Programmatic compiler options
 */
const normalizeCompilerOptions = (
  compilerOptions: unknown
): ts.CompilerOptions => {
  // exit early if compilerOptions schema is invalid
  if (!isObjectCurly(compilerOptions)) return {}

  /**
   * TypeScript program compiler options.
   *
   * @const {ts.CompilerOptions} ret
   */
  const ret: ts.CompilerOptions = {}

  // get programmatic options
  for (const [key, val] of entries(cast<CompilerOptions>(compilerOptions))) {
    switch (key) {
      case 'importsNotUsedAsValues':
        !isNIL(val) && set(ret, key, normalizeImportsNotUsed(val))
        break
      case 'jsx':
        !isNIL(val) && set(ret, key, normalizeJsx(val))
        break
      case 'lib':
        !isNIL(val) && set(ret, key, normalizeLib(val))
        break
      case 'module':
        !isNIL(val) && set(ret, key, normalizeModule(val))
        break
      case 'moduleDetection':
        !isNIL(val) && set(ret, key, normalizeModuleDetection(val))
        break
      case 'moduleResolution':
        !isNIL(val) && set(ret, key, normalizeModuleResolution(val))
        break
      case 'newLine':
        !isNIL(val) && set(ret, key, normalizeNewLine(val))
        break
      case 'target':
        !isNIL(val) && set(ret, key, normalizeTarget(val))
        break
      default:
        COMPILER_OPTIONS.has(key) && !isNIL(val) && set(ret, key, val)
        break
    }
  }

  return ksort(ret, { deep: true })
}

export default normalizeCompilerOptions
