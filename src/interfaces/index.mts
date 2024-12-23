/**
 * @file Entry Point - Interfaces
 * @module tsconfig-utils/interfaces
 */

export type { default as FileSystem } from '#interfaces/file-system'
export type {
  default as ModuleResolutionHost
} from '#interfaces/host-module-resolution'
export type {
  default as LoadTsconfigOptions
} from '#interfaces/options-load-tsconfig'
export type {
  default as ReadTsconfigOptions
} from '#interfaces/options-read-tsconfig'
export type {
  default as ResolvePathOptions
} from '#interfaces/options-resolve-path'
export type { default as ResolvedTsconfig } from '#interfaces/resolved-tsconfig'
export type { default as TsconfigHost } from '#interfaces/tsconfig-host'
