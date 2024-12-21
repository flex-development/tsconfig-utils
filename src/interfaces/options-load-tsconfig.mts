/**
 * @file Interfaces - LoadTsconfigOptions
 * @module tsconfig-utils/interfaces/LoadTsconfigOptions
 */

import type { ReadTsconfigOptions } from '@flex-development/tsconfig-utils'

/**
 * Options for loading tsconfig files.
 *
 * @see {@linkcode ReadTsconfigOptions}
 *
 * @extends {ReadTsconfigOptions}
 */
interface LoadTsconfigOptions extends ReadTsconfigOptions {
  /**
   * List of property paths where the value may be a relative path.
   *
   * @default
   *  new Set([
   *    'compilerOptions.baseUrl',
   *    'compilerOptions.outDir',
   *    'compilerOptions.paths.*',
   *    'compilerOptions.paths.*.*',
   *    'compilerOptions.rootDir',
   *    'exclude.*',
   *    'files.*',
   *    'include.*'
   *  ])
   */
  relativePaths?: Set<string> | readonly string[] | null | undefined
}

export type { LoadTsconfigOptions as default }
