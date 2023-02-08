/**
 * @file Utilities - resolvePaths
 * @module tsconfig-utils/utils/resolvePaths
 */

import type { ResolvePathsOptions } from '#src/interfaces'
import * as internal from '#src/internal'
import * as mlly from '@flex-development/mlly'
import type { CompilerOptions } from '@flex-development/tsconfig-types'
import loadCompilerOptions from './load-compiler-options'

/**
 * Resolves path aliases in `export`, `import`, and `require` statements in the
 * given piece of source `code`.
 *
 * @async
 *
 * @param {string} code - Code to evaluate
 * @param {ResolvePathsOptions} options - Path alias resolution options
 * @return {Promise<string>} `code` with path aliases resolved and/or unmodified
 */
const resolvePaths = async (
  code: string,
  options: ResolvePathsOptions
): Promise<string> => {
  const {
    absolute = false,
    baseUrl,
    condition,
    conditions,
    ext,
    extensions,
    file = internal.isFile,
    parent,
    preserveSymlinks,
    read = internal.readFile,
    tsconfig = mlly.toURL('tsconfig.json')
  } = options

  /**
   * User compiler options.
   *
   * @const {CompilerOptions} compilerOptions
   */
  const compilerOptions: CompilerOptions = loadCompilerOptions(tsconfig, {
    file,
    read
  })

  return mlly.resolveAliases(code, {
    absolute,
    aliases: compilerOptions.paths,
    condition,
    conditions,
    cwd: baseUrl ?? compilerOptions.baseUrl,
    ext,
    extensions,
    parent,
    preserveSymlinks
  })
}

export default resolvePaths
