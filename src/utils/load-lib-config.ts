/**
 * @file Utilities - loadLibConfig
 * @module tsconfig-utils/utils/loadLibConfig
 */

import type { LoadTsconfigOptions } from '#src/interfaces'
import type { Lib } from '@flex-development/tsconfig-types'
import type { URL } from 'node:url'
import loadCompilerOptions from './load-compiler-options'

/**
 * Loads [type definition configurations][1] from a [tsconfig][2] file.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#lib
 * [2]: https://www.typescriptlang.org/tsconfig
 *
 * @param {URL | string} id - Module id of tsconfig file
 * @param {LoadTsconfigOptions} [options={}] - Tsconfig loading options
 * @return {Lib[]} Type definition configurations array
 */
const loadLibConfig = (
  id: URL | string,
  options: LoadTsconfigOptions = {}
): Lib[] => loadCompilerOptions(id, options).lib ?? []

export default loadLibConfig
