/**
 * @file Utilities - loadLib
 * @module tsconfig-utils/utils/loadLib
 */

import type { LoadTsconfigOptions } from '#src/interfaces'
import type mlly from '@flex-development/mlly'
import type { Lib } from '@flex-development/tsconfig-types'
import loadCompilerOptions from './load-compiler-options'

/**
 * Loads [type definition library names][1] from a [tsconfig][2] file.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#lib
 * [2]: https://www.typescriptlang.org/tsconfig
 *
 * @param {mlly.ModuleId} id - Module id of tsconfig file
 * @param {LoadTsconfigOptions} [options={}] - Tsconfig loading options
 * @return {Lib[]} Type definition library names
 */
const loadLib = (
  id: mlly.ModuleId,
  options: LoadTsconfigOptions = {}
): Lib[] => {
  return loadCompilerOptions(id, options).lib ?? []
}

export default loadLib
