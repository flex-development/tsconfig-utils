/**
 * @file Utilities - loadPlugins
 * @module tsconfig-utils/utils/loadPlugins
 */

import type { LoadTsconfigOptions } from '#src/interfaces'
import type mlly from '@flex-development/mlly'
import type { Plugin } from '@flex-development/tsconfig-types'
import loadCompilerOptions from './load-compiler-options'

/**
 * Loads [language service plugin configurations][1] from a [tsconfig][2] file.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#plugins
 * [2]: https://www.typescriptlang.org/tsconfig
 *
 * @param {mlly.ModuleId} id - Module id of tsconfig file
 * @param {LoadTsconfigOptions} [options={}] - Tsconfig loading options
 * @return {Plugin[]} Language service plugin configurations array
 */
const loadPlugins = (
  id: mlly.ModuleId,
  options: LoadTsconfigOptions = {}
): Plugin[] => loadCompilerOptions(id, options).plugins ?? []

export default loadPlugins
