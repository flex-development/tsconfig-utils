/**
 * @file Utilities - loadPaths
 * @module tsconfig-utils/utils/loadPaths
 */

import type { LoadTsconfigOptions } from '#src/interfaces'
import type mlly from '@flex-development/mlly'
import type { Paths } from '@flex-development/tsconfig-types'
import { get } from '@flex-development/tutils'
import loadCompilerOptions from './load-compiler-options'

/**
 * Loads a [path alias configuration][1] from a [tsconfig][2] file.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#paths
 * [2]: https://www.typescriptlang.org/tsconfig
 *
 * @param {mlly.ModuleId} tsconfig - Module id of tsconfig file
 * @param {LoadTsconfigOptions?} [options] - Tsconfig loading options
 * @return {Paths} Path alias configuration object
 */
const loadPaths = (
  tsconfig: mlly.ModuleId,
  options?: LoadTsconfigOptions
): Paths => get(loadCompilerOptions(tsconfig, options), 'paths', {})

export default loadPaths
