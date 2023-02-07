/**
 * @file Utilities - loadCompilerOptions
 * @module tsconfig-utils/utils/loadCompilerOptions
 */

import type { LoadTsconfigOptions } from '#src/interfaces'
import type mlly from '@flex-development/mlly'
import type { CompilerOptions } from '@flex-development/tsconfig-types'
import loadTsconfig from './load-tsconfig'

/**
 * Loads [`compilerOptions`][1] from a [tsconfig][2] file.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#compilerOptions
 * [2]: https://www.typescriptlang.org/tsconfig
 *
 * @param {mlly.ModuleId} id - Module id of tsconfig file
 * @param {LoadTsconfigOptions} [options={}] - Tsconfig loading options
 * @return {CompilerOptions} Compiler options object
 */
const loadCompilerOptions = (
  id: mlly.ModuleId,
  options: LoadTsconfigOptions = {}
): CompilerOptions => loadTsconfig(id, options)?.compilerOptions ?? {}

export default loadCompilerOptions
