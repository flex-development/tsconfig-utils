# tsconfig-utils

[![github release](https://img.shields.io/github/v/release/flex-development/tsconfig-utils.svg?include_prereleases\&sort=semver)](https://github.com/flex-development/tsconfig-utils/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/tsconfig-utils.svg)](https://npmjs.com/package/@flex-development/tsconfig-utils)
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
- [Types](#types)
  - [Interfaces](#interfaces)
  - [`tsconfig-types`](#tsconfig-types)
- [Related](#related)
- [Contribute](#contribute)

## What is this?

This package exports utilities for working with [TypeScript configuration files][tsconfig].

## When should I use this?

This package can be used to merge and load tsconfig files, as well resolve path aliases.

## Install

This package is [ESM only][esm].

In Node.js (version 18+) with [yarn][]:

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
import { loadTsconfig, resolvePath } from 'https://esm.sh/@flex-development/tsconfig-utils'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import { loadTsconfig, resolvePath } from 'https://esm.sh/@flex-development/tsconfig-utils'
</script>
```

## Use

```js
import {
  isResolvedTsconfig,
  isTsconfigHost,
  loadTsconfig,
  mergeTsconfig,
  readTsconfig,
  resolvePath
} from '@flex-development/tsconfig-utils'
```

## API

This package exports the following identifiers:

- [`createModuleResolutionHost`](./src/lib/create-module-resolution-host.mts)
- [`createParseConfigHost`](./src/lib/create-parse-config-host.mts)
- [`isResolvedTsconfig`](./src/lib/is-resolved-tsconfig.mts)
- [`isTsconfigHost`](./src/lib/is-tsconfig-host.mts)
- [`loadTsconfig`](./src/lib/load-tsconfig.mts)
- [`mergeTsconfig`](./src/lib/merge-tsconfig.mts)
- [`readTsconfig`](./src/lib/read-tsconfig.mts)
- [`resolvePath`](./src/lib/resolve-path.mts)

There is no default export.

## Types

This package is fully typed with [TypeScript][].

### Interfaces

- [`FileSystem`](./src/interfaces/file-system.mts)
- [`LoadTsconfigOptions`](./src/interfaces/options-load-tsconfig.mts)
- [`ModuleResolutionHostOptions`](./src/interfaces/options-module-resolution-host.mts)
- [`ModuleResolutionHost`](./src/interfaces/host-module-resolution.mts)
- [`ParseConfigHostOptions`](./src/interfaces/options-parse-config-host.mts)
- [`ParseConfigHost`](./src/interfaces/host-parse-config.mts)
- [`ReadTsconfigOptions`](./src/interfaces/options-read-tsconfig.mts)
- [`ResolvePathOptions`](./src/interfaces/options-resolve-path.mts)
- [`ResolvedTsconfig`](./src/interfaces/options-resolve-path.mts)
- [`TsconfigHost`](./src/interfaces/tsconfig-host.mts)

### `tsconfig-types`

This package re-exports TypeScript definitions from [`tsconfig-types`][tsconfig-types]. This is primarily for the
convenience of TypeScript users who do not hoist packages, but may need to `import` definitions used in this package.

## Related

- [`mlly`][mlly] — [ECMAScript module][node-esm] utilities
- [`tsconfig-types`][tsconfig-types] — [TypeScript][] definitions for `tsconfig.json`

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

This project has a [code of conduct](./CODE_OF_CONDUCT.md). By interacting with this repository, organization, or
community you agree to abide by its terms.

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[mlly]: https://github.com/flex-development/mlly

[node-esm]: https://nodejs.org/api/esm.html

[tsconfig-types]: https://github.com/flex-development/tsconfig-types

[tsconfig]: https://www.typescriptlang.org/tsconfig

[typescript]: https://www.typescriptlang.org

[yarn]: https://yarnpkg.com
