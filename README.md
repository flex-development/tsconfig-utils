# tsconfig-utils

[![npm](https://img.shields.io/npm/v/@flex-development/tsconfig-utils.svg)](https://npmjs.com/package/@flex-development/tsconfig-utils)
[![codecov](https://codecov.io/gh/flex-development/tsconfig-utils/branch/main/graph/badge.svg?token=c7gDtTlaw3)](https://codecov.io/gh/flex-development/tsconfig-utils)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/tsconfig-utils.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits&logoColor=ffffff)](https://conventionalcommits.org/)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript&logoColor=ffffff)](https://typescriptlang.org/)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)](https://vitest.dev/)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat&logo=yarn&logoColor=ffffff)](https://yarnpkg.com/)

Utilities for working with [`tsconfig`][1] files

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`COMPILER_OPTIONS`](#compiler_options)
  - [`LIB`](#lib)
  - [`loadCompilerOptions(tsconfig[, options])`](#loadcompileroptionstsconfig-options)
  - [`loadLib(tsconfig[, options])`](#loadlibtsconfig-options)
  - [`loadPaths(tsconfig[, options])`](#loadpathstsconfig-options)
  - [`loadPlugins(tsconfig[, options])`](#loadpluginstsconfig-options)
  - [`loadTsconfig(id[, options])`](#loadtsconfigid-options)
  - [`normalizeCompilerOptions(option)`](#normalizecompileroptionscompileroptions)
  - [`normalizeImportsNotUsed(option)`](#normalizeimportsnotusedoption)
  - [`normalizeJsx(option)`](#normalizejsxoption)
  - [`normalizeLib(option)`](#normalizeliboption)
  - [`normalizeModule(option)`](#normalizemoduleoption)
  - [`normalizeModuleDetection(option)`](#normalizemoduledetectionoption)
  - [`normalizeModuleResolution(option)`](#normalizemoduleresolutionoption)
  - [`normalizeNewLine(option)`](#normalizenewlineoption)
  - [`normalizeTarget(option)`](#normalizetargetoption)
  - [`resolvePaths(code, options)`](#resolvepathscode-options)
- [Types](#types)
  - [Interfaces](#interfaces)
  - [`tsconfig-types`](#tsconfig-types)
- [Related](#related)
- [Contribute](#contribute)

## What is this?

This package exports a set of utilities for working with [TypeScript configuration files][1].

## When should I use this?

This package can be used to [load tsconfig files](#loadtsconfigid-options), [resolve path
aliases](#resolvepathscode-options), and [normalize user options](#api) for the [TypeScript Compiler API][2].

## Install

This package is [ESM only][3].

```sh
yarn add @flex-development/tsconfig-utils
```

From Git:

```sh
yarn add @flex-development/tsconfig-utils@flex-development/tsconfig-utils
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/features/protocols#git'>Git - Protocols | Yarn</a>
    &nbsp;for details on requesting a specific branch, commit, or tag.
  </small>
</blockquote>

## Use

Let's say a developer wants to run a TypeScript file using `node`. The developer has a [`tsconfig.json`](tsconfig.json)
with path alias configurations.

They implement [`loader.mjs`](loader.mjs) (and for good measure, [`typings/node/loader.d.ts`](typings/node/loader.d.ts)
too :wink:):

```typescript
/**
 * @file Custom Loader Hooks
 * @module loader
 * @see https://nodejs.org/api/esm.html#loaders
 */

import * as mlly from '@flex-development/mlly'
import * as pathe from '@flex-development/pathe'
import * as tscu from '@flex-development/tsconfig-utils'
import * as tutils from '@flex-development/tutils'
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
   * @type {pathe.Ext | tutils.EmptyString}
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
      loader: ext.slice(/^\.[cm]/.test(ext) ? 2 : 1),
      minify: false,
      sourcefile: fileURLToPath(url),
      sourcemap: 'inline',
      target: `node${process.versions.node}`,
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
```

The developer creates `scratch.ts` to test their custom loader hooks:

```typescript
/**
 * @file Scratch
 * @module scratch
 */

import { resolvePaths } from '@flex-development/tsconfig-utils'
import { dedent } from 'ts-dedent'

const code = dedent`
  import type { ResolveAliasOptions } from '#src/interfaces'
  import * as internal from '#src/internal'
  import loadCompilerOptions from '#src/utils/load-compiler-options'
  import * as mlly from '@flex-development/mlly'
`

console.debug(await resolvePaths(code, { ext: '', parent: import.meta.url }))
```

Running the file with `node --loader=./loader.mjs ./scratch` yields:

```sh
import type { ResolveAliasOptions } from './src/interfaces'
import * as internal from './src/internal'
import loadCompilerOptions from './src/utils/load-compiler-options'
import * as mlly from '@flex-development/mlly'
```

Pleased with their work, they crack open a cold Red Bull :blush:

## API

This package exports the following identifiers:

- [`COMPILER_OPTIONS`](#compiler_options)
- [`LIB`](#lib)
- [`loadCompilerOptions`](#loadcompileroptionstsconfig-options)
- [`loadLib`](#loadlibtsconfig-options)
- [`loadPaths`](#loadpathstsconfig-options)
- [`loadPlugins`](#loadpluginstsconfig-options)
- [`loadTsconfig`](#loadtsconfigid-options)
- [`normalizeCompilerOptions`](#normalizecompileroptionscompileroptions)
- [`normalizeImportsNotUsed`](#normalizeimportsnotusedoption)
- [`normalizeJsx`](#normalizejsxoption)
- [`normalizeLib`](#normalizeliboption)
- [`normalizeModule`](#normalizemoduleoption)
- [`normalizeModuleDetection`](#normalizemoduledetectionoption)
- [`normalizeModuleResolution`](#normalizemoduleresolutionoption)
- [`normalizeNewLine`](#normalizenewlineoption)
- [`normalizeTarget`](#normalizetargetoption)
- [`resolvePaths`](#resolvepathscode-options)

There is no default export.

### `COMPILER_OPTIONS`

Set containing [compiler option][4] names.

#### Source

> [`src/utils/compiler-options.ts`](src/utils/compiler-options.ts)

### `LIB`

Map containing [type definition library names][5] that correspond to files in the `**/node_modules/typescript/lib`
directory.

All keys are lowercase.

#### Source

> [`src/utils/lib.ts`](src/utils/lib.ts)

### `loadCompilerOptions(tsconfig[, options])`

Loads [`compilerOptions`][4] from a [tsconfig][1] file.

#### Parameters

- `{mlly.ModuleId}` **`tsconfig`** &mdash; Module id of tsconfig file
- `{LoadTsconfigOptions?}` **`[options]`** &mdash; Tsconfig loading options

#### Returns

`{CompilerOptions}` Compiler options object.

#### Source

> [`src/utils/load-compiler-options.ts`](src/utils/load-compiler-options.ts)

### `loadLib(tsconfig[, options])`

Loads [type definition library names][5] from a [tsconfig][1] file.

#### Parameters

- `{mlly.ModuleId}` **`tsconfig`** &mdash; Module id of tsconfig file
- `{LoadTsconfigOptions?}` **`[options]`** &mdash; Tsconfig loading options

#### Returns

`{Lib[]}` Type definition library names array.

#### Source

> [`src/utils/load-lib.ts`](src/utils/load-lib.ts)

### `loadPaths(tsconfig[, options])`

Loads a [path alias configuration][6] from a [tsconfig][1] file.

#### Parameters

- `{mlly.ModuleId}` **`tsconfig`** &mdash; Module id of tsconfig file
- `{LoadTsconfigOptions?}` **`[options]`** &mdash; Tsconfig loading options

#### Returns

`{Paths}` Path alias configuration object.

#### Source

> [`src/utils/load-paths.ts`](src/utils/load-paths.ts)

### `loadPlugins(tsconfig[, options])`

Loads [language service plugin configurations][7] from a [tsconfig][1] file.

#### Parameters

- `{mlly.ModuleId}` **`tsconfig`** &mdash; Module id of tsconfig file
- `{LoadTsconfigOptions?}` **`[options]`** &mdash; Tsconfig loading options

#### Returns

`{Plugin[]}` Language service plugin configurations array.

#### Source

> [`src/utils/load-plugins.ts`](src/utils/load-plugins.ts)

### `loadTsconfig(id[, options])`

Reads and parses the [tsconfig][1] file at the given module `id`.

If the tsconfig file is found, comments and [byte order marks (BOMs)][8] will be removed before parsing. If successfully
parsed, an object representation of the tsconfig file will be returned.

[Extending configuration files][9] is also supported. If not overwritten, the [`baseUrl`][10], [`outDir`][11], and
[`rootDir`][12] properties from the base tsconfig file will be made relative to the tsconfig file being loaded.

#### Parameters

- `{mlly.ModuleId}` **`id`** &mdash; Module id of tsconfig file
- `{LoadTsconfigOptions?}` **`[options]`** &mdash; Load options

#### Returns

`{Nullable<TSConfig>}` User configuration object or `null` if tsconfig file is not found.

#### Source

> [`src/utils/load-tsconfig.ts`](src/utils/load-tsconfig.ts)

### `normalizeCompilerOptions(compilerOptions)`

Converts the given [`compilerOptions`][4] into **programmatic** compiler options.

TypeScript programs expect compiler option objects to use enum values where appropriate.

#### Parameters

- `{unknown}` **`compilerOptions`** &mdash; User compiler options

#### Returns

`{ts.CompilerOptions}` Programmatic compiler options.

#### Source

> [`src/utils/normalize-compiler-options.ts`](src/utils/normalize-compiler-options.ts)

### `normalizeImportsNotUsed(option)`

Converts the given `option` into a **programmatic** [`importsNotUsedAsValues`][13] option.

TypeScript programs expect a `ts.ImportsNotUsedAsValues` value.

If the `option` is already programmatic, it will be returned unmodified. If it cannot be converted, `undefined` will be
returned instead.

#### Parameters

- `{unknown}` **`option`** &mdash; Option to evaluate

#### Returns

`{ts.ImportsNotUsedAsValues | undefined}` `ts.ImportsNotUsedAsValues` value or `undefined`.

#### Source

> [`src/utils/normalize-imports-not-used.ts`](src/utils/normalize-imports-not-used.ts)

### `normalizeJsx(option)`

Converts the given `option` into a **programmatic** [`jsx`][14] option.

TypeScript programs expect a `ts.JsxEmit` value.

If the `option` is already programmatic, it will be returned unmodified. If it cannot be converted, `undefined` will be
returned instead.

#### Parameters

- `{unknown}` **`option`** &mdash; Option to evaluate

#### Returns

`{ts.JsxEmit | undefined}` `ts.JsxEmit` value or `undefined`.

#### Source

> [`src/utils/normalize-jsx.ts`](src/utils/normalize-jsx.ts)

### `normalizeLib(option)`

Converts the given `option` into an array containing **programmatic** [`lib`][5] options.

TypeScript programs expect values in `compilerOptions.lib` to match filenames in `**/node_modules/typescript/lib`
exactly.

#### Parameters

- `{unknown}` **`option`** &mdash; Option to evaluate

#### Returns

`{LibFile[]}` Lib filename array.

#### Source

> [`src/utils/normalize-lib.ts`](src/utils/normalize-lib.ts)

### `normalizeModule(option)`

Converts the given `option` into a **programmatic** [`module`][15] option.

TypeScript programs expect a `ts.ModuleKind` value.

If the `option` is already programmatic, it will be returned unmodified. If it cannot be converted, `undefined` will be
returned instead.

#### Parameters

- `{unknown}` **`option`** &mdash; Option to evaluate

#### Returns

`{ts.ModuleKind | undefined}` `ts.ModuleKind` value or `undefined`.

#### Source

> [`src/utils/normalize-module.ts`](src/utils/normalize-module.ts)

### `normalizeModuleDetection(option)`

Converts the given `option` into a **programmatic** [`moduleDetection`][16] option.

TypeScript programs expect a `ts.ModuleDetectionKind` value.

If the `option` is already programmatic, it will be returned unmodified. If it cannot be converted, `undefined` will be
returned instead.

#### Parameters

- `{unknown}` **`option`** &mdash; Option to evaluate

#### Returns

`{ts.ModuleDetectionKind | undefined}` `ts.ModuleDetectionKind` value or `undefined`.

#### Source

> [`src/utils/normalize-module-detection.ts`](src/utils/normalize-module-detection.ts)

### `normalizeModuleResolution(option)`

Converts the given `option` into a **programmatic** [`moduleResolution`][17] option.

TypeScript programs expect a `ts.ModuleResolutionKind` value.

If the `option` is already programmatic, it will be returned unmodified. If it cannot be converted, `undefined` will be
returned instead.

#### Parameters

- `{unknown}` **`option`** &mdash; Option to evaluate

#### Returns

`{ts.ModuleResolutionKind | undefined}` `ts.ModuleResolutionKind` value or `undefined`.

#### Source

> [`src/utils/normalize-module-resolution.ts`](src/utils/normalize-module-resolution.ts)

### `normalizeNewLine(option)`

Converts the given `option` into a **programmatic** [`newLine`][18] option.

TypeScript programs expect a `ts.NewLineKind` value.

If the `option` is already programmatic, it will be returned unmodified. If it cannot be converted, `undefined` will be
returned instead.

#### Parameters

- `{unknown}` **`option`** &mdash; Option to evaluate

#### Returns

`{ts.NewLineKind | undefined}` `ts.NewLineKind` value or `undefined`.

#### Source

> [`src/utils/normalize-new-line.ts`](src/utils/normalize-new-line.ts)

### `normalizeTarget(option)`

Converts the given `option` into a **programmatic** [`target`][19] option.

TypeScript programs expect a `ts.ScriptTarget` value.

If the `option` is already programmatic, it will be returned unmodified. If it cannot be converted, `undefined` will be
returned instead.

#### Parameters

- `{unknown}` **`option`** &mdash; Option to evaluate

#### Returns

`{ts.ScriptTarget | undefined}` `ts.ScriptTarget` value or `undefined`.

#### Source

> [`src/utils/normalize-target.ts`](src/utils/normalize-target.ts)

### `resolvePaths(code, options)`

Resolves path aliases in `export`, `import`, and `require` statements in the given piece of source `code`.

#### Parameters

- `{string}` **`code`** &mdash; Code to evaluate
- `{ResolvePathsOptions}` **`options`** &mdash; Path alias resolution options

#### Returns

`{Promise<string>}` `code` with path aliases resolved and/or unmodified.

#### Source

> [`src/utils/resolve-paths.ts`](src/utils/resolve-paths.ts)

## Types

This package is fully typed with [TypeScript][20].

### Interfaces

- [`LoadTsconfigOptions`](src/interfaces/options-load-tsconfig.ts)
- [`ResolvePathsOptions`](src/interfaces/options-resolve-paths.ts)

### `tsconfig-types`

This package re-exports TypeScript definitions from [`tsconfig-types`][21]. This is primarily for the convenience of
TypeScript users who do not hoist packages, but may need to `import` definitions used in this package.

## Related

- [`mlly`][22] &mdash; [ECMAScript module][23] utilities
- [`tsconfig-types`][21] &mdash; [TypeScript][20] definitions for `tsconfig.json`

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

[1]: https://www.typescriptlang.org/tsconfig
[2]: https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
[3]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[4]: https://www.typescriptlang.org/tsconfig#compilerOptions
[5]: https://www.typescriptlang.org/tsconfig#lib
[6]: https://www.typescriptlang.org/tsconfig#paths
[7]: https://www.typescriptlang.org/tsconfig#plugins
[8]: https://en.wikipedia.org/wiki/Byte_order_mark#UTF-8
[9]: https://www.typescriptlang.org/tsconfig#extends
[10]: https://www.typescriptlang.org/tsconfig#baseUrl
[11]: https://www.typescriptlang.org/tsconfig#outDir
[12]: https://www.typescriptlang.org/tsconfig#rootDir
[13]: https://www.typescriptlang.org/tsconfig#importsNotUsedAsValues
[14]: https://www.typescriptlang.org/tsconfig#jsx
[15]: https://www.typescriptlang.org/tsconfig#module
[16]: https://www.typescriptlang.org/tsconfig#moduleDetection
[17]: https://www.typescriptlang.org/tsconfig#moduleResolution
[18]: https://www.typescriptlang.org/tsconfig#newLine
[19]: https://www.typescriptlang.org/tsconfig#target
[20]: https://www.typescriptlang.org
[21]: https://github.com/flex-development/tsconfig-types
[22]: https://github.com/flex-development/mlly
[23]: https://nodejs.org/api/esm.html
