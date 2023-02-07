/**
 * @file Utilities - normalizeCompilerOptions
 * @module tsconfig-utils/utils/normalizeCompilerOptions
 */

import type {
  CompilerOptions,
  CompilerOptionsValue
} from '@flex-development/tsconfig-types'
import { isNIL, isPrimitive, type Nilable } from '@flex-development/tutils'
import sortKeys from 'sort-keys'
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
  if (Array.isArray(compilerOptions) || isPrimitive(compilerOptions)) return {}

  /**
   * TypeScript program compiler options.
   *
   * @const {ts.CompilerOptions} ret
   */
  const ret: ts.CompilerOptions = {}

  /**
   * Sets a compiler option on {@linkcode ret}.
   *
   * Does nothing if the given `value` is `null` or `undefined`.
   *
   * @param {keyof ts.CompilerOptions} option - Compiler option name
   * @param {Nilable<CompilerOptionsValue>} value - Compiler option value
   * @return {void} Nothing when complete
   */
  const set = (
    option: keyof ts.CompilerOptions,
    value: Nilable<CompilerOptionsValue>
  ): void => void (!isNIL(value) && (ret[option] = value))

  // get programmatic options
  for (const [key, val] of Object.entries(compilerOptions as CompilerOptions)) {
    switch (key) {
      case 'importsNotUsedAsValues':
        set(key, normalizeImportsNotUsed(val))
        break
      case 'jsx':
        set(key, normalizeJsx(val))
        break
      case 'lib':
        set(key, normalizeLib(val))
        break
      case 'module':
        set(key, normalizeModule(val))
        break
      case 'moduleDetection':
        set(key, normalizeModuleDetection(val))
        break
      case 'moduleResolution':
        set(key, normalizeModuleResolution(val))
        break
      case 'newLine':
        set(key, normalizeNewLine(val))
        break
      case 'target':
        set(key, normalizeTarget(val))
        break
      default:
        COMPILER_OPTIONS.has(key) && set(key, val)
        break
    }
  }

  return sortKeys(ret, { deep: true })
}

export default normalizeCompilerOptions
