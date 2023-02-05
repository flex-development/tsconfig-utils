/**
 * @file Utilities - loadCompilerOptions
 * @module tsconfig-utils/utils/loadCompilerOptions
 */

import type { LoadTsconfigOptions } from '#src/interfaces'
import type { CompilerOptions } from '@flex-development/tsconfig-types'
import type { URL } from 'node:url'
import loadTsconfig from './load-tsconfig'

/**
 * Loads [`compilerOptions`][1] from a [tsconfig][2] file.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#compilerOptions
 * [2]: https://www.typescriptlang.org/tsconfig
 *
 * @param {URL | string} id - Module id of tsconfig file
 * @param {LoadTsconfigOptions} [options={}] - Tsconfig loading options
 * @return {CompilerOptions} Compiler options object
 */
const loadCompilerOptions = (
  id: URL | string,
  options: LoadTsconfigOptions = {}
): CompilerOptions => loadTsconfig(id, options)?.compilerOptions ?? {}

export default loadCompilerOptions
