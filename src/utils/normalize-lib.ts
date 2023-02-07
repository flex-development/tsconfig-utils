/**
 * @file Utilities - normalizeLib
 * @module tsconfig-utils/utils/normalizeLib
 */

import type { Lib, LibFile } from '@flex-development/tsconfig-types'
import { isString, isUndefined } from '@flex-development/tutils'
import LIB from './lib'

/**
 * Converts the given `option` into an array containing **programmatic**
 * [`lib`][1] options.
 *
 * TypeScript programs expect values in `compilerOptions.lib` to match filenames
 * in `node_modules/typescript/lib` exactly.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#lib
 *
 * @param {unknown} option - Option to evaluate
 * @return {LibFile[]} Lib filename array
 */
const normalizeLib = (option: unknown): LibFile[] => {
  return (Array.isArray(option) ? option : [])
    .filter(item => isString(item))
    .map((name: string) => LIB.get(name.toLowerCase() as Lowercase<Lib>))
    .filter(file => !isUndefined(file)) as LibFile[]
}

export default normalizeLib
