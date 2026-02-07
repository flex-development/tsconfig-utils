# tsconfig-utils

[![github release](https://img.shields.io/github/v/release/flex-development/tsconfig-utils.svg?include_prereleases\&sort=semver)](https://github.com/flex-development/tsconfig-utils/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/tsconfig-utils.svg)](https://npmjs.com/package/@flex-development/tsconfig-utils)
[![npm downloads](https://img.shields.io/npm/dm/@flex-development/tsconfig-utils.svg)](https://www.npmcharts.com/compare/@flex-development/tsconfig-utils?interval=30)
[![install size](https://packagephobia.now.sh/badge?p=@flex-development/tsconfig-utils)](https://packagephobia.now.sh/result?p=@flex-development/tsconfig-utils)
[![codecov](https://codecov.io/gh/flex-development/tsconfig-utils/branch/main/graph/badge.svg?token=c7gDtTlaw3)](https://codecov.io/gh/flex-development/tsconfig-utils)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/tsconfig-utils.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits\&logoColor=ffffff)](https://conventionalcommits.org)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript\&logoColor=ffffff)](https://typescriptlang.org)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat\&logo=vitest\&logoColor=ffffff)](https://vitest.dev)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat\&logo=yarn\&logoColor=ffffff)](https://yarnpkg.com)

Utilities for working with [`tsconfig`][tsconfig] files

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`createGetCanonicalFileName([useCaseSensitiveFileNames])`](#creategetcanonicalfilenameusecasesensitivefilenames)
  - [`createModuleResolutionHost([options])`](#createmoduleresolutionhostoptions)
  - [`createParseConfigHost([options])`](#createparseconfighostoptions)
  - [`isResolvedTsconfig(value)`](#isresolvedtsconfigvalue)
  - [`isTsconfigHost(value)`](#istsconfighostvalue)
  - [`loadTsconfig<T>([id][, options])`](#loadtsconfigtid-options)
  - [`mergeTsconfig<T>(target[, ...tsconfigs])`](#mergetsconfigttarget-tsconfigs)
  - [`readTsconfig<T>([id][, options])`](#readtsconfigtid-options)
  - [`resolvePath(specifier[, options])`](#resolvepathspecifier-options)
- [Types](#types)
  - [`tsconfig-types`](#tsconfig-types)
  - [`Awaitable<T>`](#awaitablet)
  - [`DirectoryExists`](#directoryexists)
  - [`Dirent`](#dirent)
  - [`FileExists`](#fileexists)
  - [`FileSystem`](#filesystem)
  - [`GetCanonicalFileName`](#getcanonicalfilename)
  - [`GetCurrentDirectory`](#getcurrentdirectory)
  - [`GetDirectories`](#getdirectories)
  - [`HostReadFile`](#hostreadfile)
  - [`IsDirectory`](#isdirectory)
  - [`IsFile`](#isfile)
  - [`IsSymbolicLink`](#issymboliclink)
  - [`List<[T]>`](#listt)
  - [`LoadTsconfigOptions`](#loadtsconfigoptions)
  - [`ModuleResolutionHostOptions`](#moduleresolutionhostoptions)
  - [`ModuleResolutionHost`](#moduleresolutionhost)
  - [`ParseConfigHostOptions`](#parseconfighostoptions)
  - [`ParseConfigHost`](#parseconfighost)
  - [`ReadDirectory`](#readdirectory)
  - [`ReadFile`](#readfile)
  - [`ReadTsconfigOptions`](#readtsconfigoptions)
  - [`ReaddirDirentOptions`](#readdirdirentoptions)
  - [`ReaddirOptions`](#readdiroptions)
  - [`Readdir`](#readdir)
  - [`Realpath`](#realpath)
  - [`ResolvePathOptions`](#resolvepathoptions)
  - [`ResolvedTsconfig`](#resolvedtsconfig)
  - [`Stat`](#stat)
  - [`Stats`](#stats)
  - [`TsconfigHost`](#tsconfighost)
  - [`UseCaseSensitiveFileNamesFn`](#usecasesensitivefilenamesfn)
  - [`UseCaseSensitiveFileNames`](#usecasesensitivefilenames)
- [Related](#related)
- [Contribute](#contribute)

## What is this?

This package exports utilities for working with [TypeScript configuration files][tsconfig].

## When should I use this?

This package can be used to merge and load tsconfig files, as well resolve path aliases.

## Install

This package is [ESM only][esm].

In Node.js (version 20+) with [yarn][]:

```sh
yarn add @flex-development/tsconfig-utils
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/protocol/git'>Git - Protocols | Yarn</a>
    &nbsp;for details regarding installing from Git.
  </small>
</blockquote>

In Deno with [`esm.sh`][esmsh]:

```ts
import {
  createModuleResolutionHost,
  loadTsconfig,
  resolvePath
} from 'https://esm.sh/@flex-development/tsconfig-utils'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {
    createModuleResolutionHost,
    loadTsconfig,
    resolvePath
  } from 'https://esm.sh/@flex-development/tsconfig-utils'
</script>
```

## Use

```ts
import {
  loadTsconfig,
  type ResolvedTsconfig
} from '@flex-development/tsconfig-utils'
import fs from 'node:fs'

/**
 * The resolved tsconfig.
 *
 * @const {ResolvedTsconfig | null} resolved
 */
const resolved: ResolvedTsconfig | null = await loadTsconfig(null, {
  encoding: 'utf8',
  fs: fs.promises
})

if (resolved) {
  console.dir(resolved.tsconfig) // the loaded tsconfig, with bases applied
  console.dir(resolved.url) // the url of the tsconfig file
}
```

## API

This package exports the following identifiers listed below.

There is no default export.

### `createGetCanonicalFileName([useCaseSensitiveFileNames])`

Create a canonical file name function.

#### Parameters

- `useCaseSensitiveFileNames` ([`UseCaseSensitiveFileNames`](#usecasesensitivefilenames))
  — whether to treat filenames as case sensitive

#### Returns

([`GetCanonicalFileName`](#getcanonicalfilename)) A function that returns a canonical file name given a module id

### `createModuleResolutionHost([options])`

Create a module resolution host.

The module resolution host acts a bridge between the TypeScript compiler and the file system.

> 👉 **Note**: The host can have both asynchronous and synchronous methods,
> but when used with the native TypeScript compiler, all methods must return synchronous values.

#### Parameters

- `options` ([`ModuleResolutionHostOptions`](#moduleresolutionhostoptions) | `null` | `undefined`)
  — options for host creation

#### Returns

([`ModuleResolutionHost`](#moduleresolutionhost)) The module resolution host

### `createParseConfigHost([options])`

Create a configuration parser host.

The parser host provides methods for accessing the file system and resolving module paths.

> 👉 **Note**: The host can have both asynchronous and synchronous methods,
> but when used with the native TypeScript compiler, all methods must return synchronous values.

#### Parameters

- `options` ([`ParseConfigHostOptions`](#parseconfighostoptions) | `null` | `undefined`)
  — options for host creation

#### Returns

([`ParseConfigHost`](#parseconfighost)) The parse config host

### `isResolvedTsconfig(value)`

Check if `value` is a resolved configuration object.

#### Parameters

- `value` (`unknown`)
  — the value to check

#### Returns

([`value is ResolvedTsconfig`](#resolvedtsconfig)) `true` if `value` is resolved tsconfig object, `false` otherwise

### `isTsconfigHost(value)`

Check if `value` is an object with a [`Tsconfig`][tt-tsconfig].

#### Parameters

- `value` (`unknown`)
  — the value to check

#### Returns

([`value is TsconfigHost`](#tsconfighost)) `true` if `value` is tsconfig host object, `false` otherwise

### `loadTsconfig<T>([id][, options])`

Load a tsconfig file.

#### Type Parameters

- `T` ([`Awaitable<ResolvedTsconfig | null>`](#resolvedtsconfig))
  — the resolved tsconfig

#### Parameters

- `id` ([`ModuleId`][mlly-moduleid] | `null` | `undefined`)
  — the module id or specifier of the tsconfig file
  - **default**: `'tsconfig.json'`
- `options` ([`LoadTsconfigOptions`](#loadtsconfigoptions) | `null` | `undefined`)
  — load options

#### Returns

(`T`) The resolved tsconfig, or `null` if tsconfig file is not found

### `mergeTsconfig<T>(target[, ...tsconfigs])`

Merge one or more tsconfig objects into a single [`Tsconfig`][tt-tsconfig].

Tsconfig source objects are applied from left to right.
Subsequent sources overwrite property assignments of previous sources.

> 👉 **Note**: If `target` is a [`TsconfigHost`](#tsconfighost), `target.tsconfig` will be modified.
> Otherwise, `target` will be modified.

#### Type Parameters

- `T` ([`Tsconfig`][tt-tsconfig])
  — the merged tsconfig

#### Parameters

- `target` ([`Tsconfig`][tt-tsconfig] | [`TsconfigHost`](#tsconfighost) | `null` | `undefined`)
  — the target tsconfig or tsconfig host
- `...tsconfigs` (`readonly (Tsconfig | TsconfigHost | null | undefined)[]`)
  — the source tsconfig object(s)

#### Returns

(`T`) The merged tsconfig

### `readTsconfig<T>([id][, options])`

Read a tsconfig file.

> 👉 **Note**: Returns a promise if [`getSource`][mlly-getsource]
> or [`resolveModule`][mlly-resolvemodule] returns a promise.

#### Type Parameters

- `T` ([`Awaitable<ResolvedTsconfig | null>`](#resolvedtsconfig))
  — the resolved tsconfig

#### Parameters

- `id` ([`ModuleId`][mlly-moduleid] | `null` | `undefined`)
  — the module id or specifier of the tsconfig file
  - **default**: `'tsconfig.json'`
- `options` ([`ReadTsconfigOptions`](#readtsconfigoptions) | `null` | `undefined`)
  — read options

#### Returns

(`T`) The resolved tsconfig, or `null` if tsconfig file is not found

### `resolvePath(specifier[, options])`

Resolve an aliased `specifier`.

#### Parameters

- `specifier` (`string`)
  — the specifier using an alias
- `options` ([`ResolvePathOptions`](#resolvepathoptions) | `null` | `undefined`)
  — alias resolution options

#### Returns

(`string` | `null`) The path alias match or `null` if match is not found

## Types

This package is fully typed with [TypeScript][].

### `tsconfig-types`

This package re-exports TypeScript definitions from [`tsconfig-types`][tsconfig-types].
This is primarily for the convenience of TypeScript users who do not hoist packages,
but may need to `import` definitions used in this package.

### `Awaitable<T>`

Create a union of `T` and `T` as a promise-like object (`type`).

```ts
type Awaitable<T> = PromiseLike<T> | T
```

#### Type Parameters

- `T` (`any`)
  — the value

### `DirectoryExists`

Check if a directory exists (`interface`).

#### Signatures

```ts
<T extends Awaitable<boolean>>(id: ModuleId): T
```

#### Type Parameters

- `T` ([`Awaitable<boolean>`](#awaitablet))
  — the result of the check

#### Parameters

- `id` ([`ModuleId`][mlly-moduleid])
  — the module id to check

#### Returns

(`T`) `true` if directory exists at `id`, `false` otherwise

### `Dirent`

Information about a directory entry (`interface`).

#### Properties

- `isDirectory` ([`IsDirectory`](#isdirectory))
  — check if the entry is a directory
- `isFile` ([`IsFile`](#isfile))
  — check if the entry is a file
- `isSymbolicLink` ([`IsSymbolicLink`](#issymboliclink))
  — check if the entry is a symbolic link
- `name` (`string`)
  — the path to the entry, relative to the `parentPath`
- `parentPath` (`string`)
  — the path to the parent directory

### `FileExists`

Check if a file exists (`interface`).

#### Signatures

```ts
<T extends Awaitable<boolean>>(id: ModuleId): T
```

#### Type Parameters

- `T` ([`Awaitable<boolean>`](#awaitablet))
  — the result of the check

#### Parameters

- `id` ([`ModuleId`][mlly-moduleid])
  — the module id to check

#### Returns

(`T`) `true` if file exists at `id`, `false` otherwise

### `FileSystem`

The file system API (`interface`).

#### Properties

- `readFile` ([`ReadFile`](#readfile))
  — read the entire contents of a file
- `readdir` ([`Readdir`](#readdir))
  — read the entire contents of a directory
- `realpath` ([`Realpath`](#realpath))
  — compute a canonical pathname by resolving `.`, `..`, and symbolic links
- `stat` ([`Stat`](#stat))
  — get information about a file system entry

### `GetCanonicalFileName`

Get the canonical file name for a module id (`type`).

```ts
type GetCanonicalFileName = (this: void, id: ModuleId) => string
```

#### Parameters

- `id` ([`ModuleId`][mlly-moduleid])
  — the module id

#### Returns

(`string`) The canonical file name

### `GetCurrentDirectory`

Get the path to the current working directory (`interface`).

#### Signatures

```ts
<T extends Awaitable<string>>(): T
```

#### Type Parameters

- `T` ([`Awaitable<string>`](#awaitablet))
  — the directory path

#### Parameters

- `id` ([`ModuleId`][mlly-moduleid])
  — the module id to check

#### Returns

(`T`) The current working directory path

### `GetDirectories`

Get a list of subdirectories (`interface`).

#### Signatures

```ts
<T extends Awaitable<string[]>>(parent: ModuleId): T
```

#### Type Parameters

- `T` ([`Awaitable<string[]>`](#awaitablet))
  — the list of subdirectory names

#### Parameters

- `id` ([`ModuleId`][mlly-moduleid])
  — the module id of the parent directory

#### Returns

(`T`) The list of subdirectory names

### `HostReadFile`

Read the entire contents of a file (`interface`).

#### Signatures

```ts
<T extends Awaitable<string | undefined>>(id: ModuleId): T
```

#### Type Parameters

- `T` ([`Awaitable<string | undefined>`](#awaitablet))
  — the file contents

#### Parameters

- `id` ([`ModuleId`][mlly-moduleid])
  — the module id of the file

#### Returns

(`T`) The file contents, or `undefined` if file does not exist at `id`

### `IsDirectory`

Check if a file system entry is a directory (`interface`).

#### Extends

- [`mlly.IsDirectory`][mlly-isdirectory]

### `IsFile`

Check if a file system entry is a file (`interface`).

#### Extends

- [`mlly.IsFile`][mlly-isfile]

### `IsSymbolicLink`

Check if a file system entry is a symbolic link (`interface`).

#### Signatures

```ts
(): boolean
```

#### Returns

(`boolean`) `true` if entry is symbolic link, `false` otherwise

### `List<[T]>`

A list (`type`).

```ts
type List<T = unknown> = ReadonlySet<T> | readonly T[]
```

#### Type Parameters

- `T` (`any`, optional)
  — the list item type

### `LoadTsconfigOptions`

Options for loading tsconfig files (`interface`).

#### Extends

- [`ReadTsconfigOptions`](#readtsconfigoptions)

#### Properties

- `relativePaths` ([`List<string>`](#listt) | `null` | `undefined`)
  — the list of property paths where the value may be a relative path

### `ModuleResolutionHostOptions`

Options for creating module resolution hosts (`interface`).

#### Properties

- `encoding?` ([`BufferEncoding`][mlly-bufferencoding])
  — the encoding to use when reading files
  - **default**: `'utf8'`
- `fs?` ([`FileSystem`](#filesystem) | `null` | `undefined`)
  — the file system api
- `root?` ([`ModuleId`][mlly-moduleid] | `null` | `undefined`)
  — the module id of the current working directory
- `useCaseSensitiveFileNames?` ([`UseCaseSensitiveFileNames`](#usecasesensitivefilenames))
  — boolean indicating whether filenames should be treated as case sensitive, or a function that returns such a value

### `ModuleResolutionHost`

The module resolution host API (`interface`).

The module resolution host acts a bridge between the TypeScript compiler and the file system.

> 👉 **Note**: The host can have both asynchronous and synchronous methods,
> but when used with the native TypeScript compiler, all methods must return synchronous values.

#### Properties

- `directoryExists` ([`DirectoryExists`](#directoryexists))
  — check if a directory exists
- `fileExists` ([`FileExists`](#fileexists))
  — check if a file exists
- `getCurrentDirectory` ([`GetCurrentDirectory`](#getcurrentdirectory))
  — get the path to the current working directory
- `getDirectories` ([`GetDirectories`](#getdirectories))
  — get a list of subdirectories
- `readFile` ([`HostReadFile`](#hostreadfile))
  — read the entire contents of a file
- `realpath` ([`Realpath`](#realpath))
  — compute a canonical pathname by resolving `.`, `..`, and symbolic links
- `useCaseSensitiveFileNames?` ([`UseCaseSensitiveFileNames`](#usecasesensitivefilenames))
  — whether to treat filenames as case sensitive

### `ParseConfigHostOptions`

Options for creating parse config hosts (`interface`).

#### Extends

- [`ModuleResolutionHostOptions`](#moduleresolutionhostoptions)

### `ParseConfigHost`

The configuration parser host API (`interface`).

The parser host provides methods for accessing the file system and resolving module paths.

> 👉 **Note**: The host can have both asynchronous and synchronous methods,
> but when used with the native TypeScript compiler, all methods must return synchronous values.

#### Extends

- [`ModuleResolutionHost`](#moduleresolutionhost)

#### Properties

- `readDirectory` ([`ReadDirectory`](#readdirectory))
  — read the contents of a directory
- `useCaseSensitiveFileNames` (`boolean`)
  — whether to treat filenames as case sensitive

### `ReadDirectory`

Read the contents of a directory (`interface`).

#### Signatures

```ts
<T extends Awaitable<readonly string[]>>(
  parent: ModuleId,
  extensions?: List<string> | null | undefined,
  exclude?: List<string> | null | undefined,
  include?: List<string> | null | undefined,
  depth?: number | null | undefined
): T
```

#### Type Parameters

- `T` ([`Awaitable<readonly string[]>`](#awaitablet))
  — the list of matched files

#### Parameters

- `parent` ([`ModuleId`][mlly-moduleid])
  — the module id of the parent directory
- `extensions` ([`List<string>`](#listt) | `null` | `undefined`)
  — the list of file extensions to filter for
- `exclude` ([`List<string>`](#listt) | `null` | `undefined`)
  — the list of glob patterns matching files to exclude
- `include` ([`List<string>`](#listt) | `null` | `undefined`)
  — the list of glob patterns matching files to include
- `depth` (`number` | `null` | `undefined`)
  — the maximum search depth (inclusive)

#### Returns

(`T`) The list of matched files

### `ReadFile`

Read the entire contents of a file (`interface`).

#### Extends

- [`mlly.ReadFile`][mlly-readfile]

### `ReadTsconfigOptions`

Options for reading tsconfig files (`interface`).

#### Extends

- [`GetSourceOptions`][mlly-getsourceoptions]

#### Properties

- `conditions` ([`List<Condition>`][mlly-condition] | `null` | `undefined`)
  — the list of export/import conditions
  - **default**: [`mlly.defaultConditions`][mlly-defaultconditions]
  > 👉 **note**: should be sorted by priority
- `cwd` ([`ModuleId`][mlly-moduleid] | `null` | `undefined`)
  — the url of the current working directory
  - **default**: [`mlly.cwd()`][mlly-cwd]
- `mainFields` ([`List<MainField>`][mlly-mainfield] | `null` | `undefined`)
  — the list of legacy `main` fields
  - **default**: [`mlly.defaultMainFields`][mlly-defaultmainfields]
  > 👉 **note**: should be sorted by priority
- `parent` ([`ModuleId`][mlly-moduleid] | `null` | `undefined`)
  — the parent module id
  - **default**: `cwd` | [`mlly.cwd()`][mlly-cwd]
- `preserveSymlinks` (`boolean` | `null` | `undefined`)
  — whether to keep symlinks instead of resolving them

### `ReaddirDirentOptions`

Options for reading the contents of a directory (`interface`).

#### Extends

- [`ReaddirOptions`](#readdiroptions)

#### Properties

- `withFileTypes` (`true`)
  — whether the result should be a content object list instead of just strings.\
  if `true`, the result will be a list of [`Direct`](#dirent) objects, which provide methods
  like [`isDirectory()`](#isdirectory) and [`isFile()`](#isfile) to get more information about
  a file system entry without additional [`fs.stat()`](#stat) calls

### `ReaddirOptions`

Options for reading the contents of a directory (`interface`).

#### Extends

- [`ReaddirOptions`](#readdiroptions)

#### Properties

- `withFileTypes?` (`boolean` | `null` | `undefined`)
  — whether the result should be a content object list instead of just strings.\
  if `true`, the result will be a list of [`Direct`](#dirent) objects, which provide methods
  like [`isDirectory()`](#isdirectory) and [`isFile()`](#isfile) to get more information about
  a file system entry without additional [`fs.stat()`](#stat) calls

### `Readdir`

Read the entire contents of a directory (`interface`).

#### Signatures

```ts
<T extends Awaitable<readonly Dirent[]>>(id: ModuleId, options: ReaddirDirentOptions): T
```

#### Type Parameters

- `T` ([`Awaitable<readonly Dirent[]>`](#dirent))
  — the directory contents

#### Parameters

- `id` ([`ModuleId`][mlly-moduleid])
  — the module id of the file
- `options` ([`ReaddirDirentOptions`](#readdirdirentoptions))
  — read options

#### Returns

(`T`) The directory contents

### `Realpath`

Compute a canonical pathname by resolving `.`, `..`, and symbolic links (`interface`).

#### Extends

- [`mlly.Realpath`][mlly-realpath]

### `ResolvePathOptions`

Options for path alias resolution (`interface`).

#### Extends

- [`ResolveAliasOptions`][mlly-resolvealiasoptions]

#### Properties

- `aliases?` (`null` | `undefined`)
  — the url of the tsconfig file
  > 👉 **note**: path aliases are read from the `tsconfig`
- `tsconfig?` ([`ResolvedTsconfig`](#resolvedtsconfig) | [`Tsconfig`][tt-tsconfig] `null` | `undefined`)
  — the tsconfig object, or the resolved tsconfig

### `ResolvedTsconfig`

A resolved TypeScript configuration (`interface`).

#### Extends

- [`TsconfigHost`](#tsconfighost)

#### Properties

- `url` (`URL`)
  — the url of the tsconfig file

### `Stat`

Get information about a file system entry (`interface`).

#### Extends

- [`mlly.Stat`][mlly-stat]

### `Stats`

Information about a file system entry (`interface`).

#### Properties

- `isDirectory` ([`IsDirectory`](#isdirectory))
  — check if the entry is a directory
- `isFile` ([`IsFile`](#isfile))
  — check if the entry is a file

### `TsconfigHost`

An object with a TypeScript configuration (`interface`).

#### Properties

- `tsconfig` ([`Tsconfig`][tt-tsconfig])
  — the tsconfig object

### `UseCaseSensitiveFileNamesFn`

Determine if file names should be treated as case sensitive (`type`).

```ts
type UseCaseSensitiveFileNamesFn = (this: void) => boolean | null | undefined
```

#### Returns

(`boolean` | `null` | `undefined`) `true` if file names should be treated as case sensitive

### `UseCaseSensitiveFileNames`

Union of values used to determine if file names should be treated as case sensitive (`type`).

```ts
type UseCaseSensitiveFileNames =
  | UseCaseSensitiveFileNamesFn
  | boolean
  | null
  | undefined
```

#### Returns

(`boolean` | `null` | `undefined`) `true` if file names should be treated as case sensitive

## Related

- [`@flex-development/mlly`][mlly]
  — [ECMAScript module][node-esm] utilities
- [`@flex-development/tsconfig-types`][tsconfig-types]
  — [TypeScript][] definitions for `tsconfig.json`

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

This project has a [code of conduct](./CODE_OF_CONDUCT.md). By interacting with this repository, organization, or
community you agree to abide by its terms.

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[mlly]: https://github.com/flex-development/mlly

[mlly-bufferencoding]: https://github.com/flex-development/mlly#bufferencoding

[mlly-condition]: https://github.com/flex-development/mlly#condition

[mlly-cwd]: https://github.com/flex-development/mlly#cwd

[mlly-defaultconditions]: https://github.com/flex-development/mlly#defaultconditions

[mlly-defaultmainfields]: https://github.com/flex-development/mlly#defaultmainfields

[mlly-getsourceoptions]: https://github.com/flex-development/mlly#getsourceoptions

[mlly-getsource]: https://github.com/flex-development/mlly#getsourcetid-options

[mlly-isdirectory]: https://github.com/flex-development/mlly#isdirectory

[mlly-isfile]: https://github.com/flex-development/mlly#isfile

[mlly-mainfield]: https://github.com/flex-development/mlly#mainfield

[mlly-moduleid]: https://github.com/flex-development/mlly#moduleid

[mlly-readfile]: https://github.com/flex-development/mlly#readfile

[mlly-realpath]: https://github.com/flex-development/mlly#realpath

[mlly-resolvealiasoptions]: https://github.com/flex-development/mlly#resolvealiasoptions

[mlly-resolvemodule]: https://github.com/flex-development/mlly#resolvemoduletspecifier-parent-options

[mlly-stat]: https://github.com/flex-development/mlly#stat

[node-esm]: https://nodejs.org/api/esm.html

[tsconfig-types]: https://github.com/flex-development/tsconfig-types

[tsconfig]: https://www.typescriptlang.org/tsconfig

[tt-tsconfig]: https://github.com/flex-development/tsconfig-types/blob/main/src/tsconfig.mts

[typescript]: https://www.typescriptlang.org

[yarn]: https://yarnpkg.com
