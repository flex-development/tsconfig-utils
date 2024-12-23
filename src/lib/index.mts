/**
 * @file Entry Point - Library
 * @module tsconfig-utils/lib
 */

export {
  default as createModuleResolutionHost
} from '#lib/create-module-resolution-host'
export { default as isResolvedTsconfig } from '#lib/is-resolved-tsconfig'
export { default as isTsconfigHost } from '#lib/is-tsconfig-host'
export { default as loadTsconfig } from '#lib/load-tsconfig'
export { default as mergeTsconfig } from '#lib/merge-tsconfig'
export { default as readTsconfig } from '#lib/read-tsconfig'
export { default as resolvePath } from '#lib/resolve-path'
