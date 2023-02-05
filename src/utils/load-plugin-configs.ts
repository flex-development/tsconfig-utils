/**
 * @file Utilities - loadPluginConfigs
 * @module tsconfig-utils/utils/loadPluginConfigs
 */

import type { LoadTsconfigOptions } from '#src/interfaces'
import type { Plugin } from '@flex-development/tsconfig-types'
import type { URL } from 'node:url'
import loadCompilerOptions from './load-compiler-options'

/**
 * Loads [language service plugin configurations][1] from a [tsconfig][2] file.
 *
 * [1]: https://www.typescriptlang.org/tsconfig#plugins
 * [2]: https://www.typescriptlang.org/tsconfig
 *
 * @param {URL | string} id - Module id of tsconfig file
 * @param {LoadTsconfigOptions} [options={}] - Tsconfig loading options
 * @return {Plugin[]} Language service plugin configurations array
 */
const loadPluginConfigs = (
  id: URL | string,
  options: LoadTsconfigOptions = {}
): Plugin[] => loadCompilerOptions(id, options).plugins ?? []

export default loadPluginConfigs
