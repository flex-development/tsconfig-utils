/**
 * @file Custom Loader Hooks
 * @module loader
 * @see https://nodejs.org/api/esm.html#loaders
 */

import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import * as tscu from '@flex-development/tsconfig-utils'
import * as esbuild from 'esbuild'
import { fileURLToPath, pathToFileURL } from 'node:url'

// add support for extensionless files in "bin" scripts
// https://github.com/nodejs/modules/issues/488
mlly.EXTENSION_FORMAT_MAP.set('', mlly.Format.COMMONJS)

/**
 * URL of tsconfig file.
 *
 * @type {import('node:url').URL}
 * @const tsconfig
 */
const tsconfig = mlly.toURL('tsconfig.json')

/**
 * TypeScript compiler options.
 *
 * @type {tscu.CompilerOptions}
 * @const compilerOptions
 */
const compilerOptions = tscu.loadCompilerOptions(tsconfig)

/**
 * Determines how the module at the given `url` should be interpreted,
 * retrieved, and parsed.
 *
 * @see {@linkcode LoadHookContext}
 * @see https://nodejs.org/api/esm.html#loadurl-context-nextload
 *
 * @async
 *
 * @param {string} url - Resolved module URL
 * @param {LoadHookContext} context - Hook context
 * @return {Promise<LoadHookResult>} Hook result
 */
export const load = async (url, context) => {
  // get module format
  context.format = context.format ?? (await mlly.getFormat(url))

  // validate import assertions
  mlly.validateAssertions(url, context.format, context.importAssertions)

  /**
   * File extension of {@linkcode url}.
   *
   * @type {string}
   * @const ext
   */
  const ext = pathe.extname(url)

  /**
   * Source code.
   *
   * @type {Uint8Array | string | undefined}
   * @var source
   */
  let source = await mlly.getSource(url, { format: context.format })

  // transform typescript files
  if (/^\.(?:cts|mts|tsx?)$/.test(ext) && !/\.d\.(?:cts|mts|ts)$/.test(url)) {
    // resolve path aliases
    source = await tscu.resolvePaths(source, {
      conditions: context.conditions,
      ext: '',
      parent: url,
      tsconfig
    })

    // resolve modules
    source = await mlly.resolveModules(source, {
      conditions: context.conditions,
      parent: url
    })

    // transpile source code
    const { code } = await esbuild.transform(source, {
      format: ext === '.cts' ? 'cjs' : 'esm',
      loader: /^[cm]/.test(ext) ? 'ts' : ext.slice(1),
      minify: false,
      sourcefile: fileURLToPath(url),
      sourcemap: 'inline',
      tsconfigRaw: { compilerOptions }
    })

    // set source code to transpiled source
    source = code
  }

  return { format: context.format, shortCircuit: true, source }
}

/**
 * Resolves the given module `specifier`.
 *
 * Adds supports for:
 *
 * - Path alias resolution
 * - Extensionless file and directory index resolution
 *
 * @see {@linkcode ResolveHookContext}
 * @see https://nodejs.org/api/esm.html#resolvespecifier-context-nextresolve
 *
 * @async
 *
 * @param {string} specifier - Module specifier
 * @param {ResolveHookContext} context - Hook context
 * @return {Promise<ResolveHookResult>} Hook result
 * @throws {Error}
 */
export const resolve = async (specifier, context) => {
  const { conditions, parentURL: parent } = context

  // resolve path alias
  specifier = await mlly.resolveAlias(specifier, {
    aliases: tscu.loadPaths(tsconfig),
    conditions,
    cwd: pathToFileURL(compilerOptions.baseUrl),
    parent
  })

  /**
   * Resolved module URL.
   *
   * @type {import('node:url').URL}
   * @const url
   */
  const url = await mlly.resolveModule(specifier, { conditions, parent })

  return {
    format: await mlly.getFormat(url),
    shortCircuit: true,
    url: url.href
  }
}
