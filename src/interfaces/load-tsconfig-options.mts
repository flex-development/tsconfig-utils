/**
 * @file Interfaces - LoadTsconfigOptions
 * @module tsconfig-utils/interfaces/LoadTsconfigOptions
 */

import type {
  List,
  ReadTsconfigOptions
} from '@flex-development/tsconfig-utils'

/**
 * Options for loading tsconfig files.
 *
 * @see {@linkcode ReadTsconfigOptions}
 *
 * @extends {ReadTsconfigOptions}
 */
interface LoadTsconfigOptions extends ReadTsconfigOptions {
  /**
   * The list of property paths where the value may be a relative path.
   *
   * @see {@linkcode List}
   *
   * @default
   *  new Set([
   *    'compilerOptions.baseUrl',
   *    'compilerOptions.outDir',
   *    'compilerOptions.paths.*',
   *    'compilerOptions.paths.*.*',
   *    'compilerOptions.rootDir',
   *    'files.*'
   *  ])
   */
  relativePaths?: List<string> | null | undefined
}

export type { LoadTsconfigOptions as default }
