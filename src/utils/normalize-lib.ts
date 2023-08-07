/**
 * @file Utilities - normalizeLib
 * @module tsconfig-utils/utils/normalizeLib
 */

import type { LibFile } from '@flex-development/tsconfig-types'
import {
  cast,
  isArray,
  isString,
  isUndefined,
  lowercase,
  select,
  type Optional
} from '@flex-development/tutils'
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
  return select<Optional<string>[], LibFile>(
    select(isArray<string>(option) ? option : [], isString, (name: string) => {
      return LIB.get(cast(lowercase(name)))
    }),
    file => !isUndefined(file)
  )
}

export default normalizeLib
