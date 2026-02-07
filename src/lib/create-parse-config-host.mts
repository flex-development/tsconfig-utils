/**
 * @file createParseConfigHost
 * @module tsconfig-utils/lib/createParseConfigHost
 */

import getFileSystemEntries from '#internal/get-file-system-entries'
import matchFiles from '#internal/match-files'
import createModuleResolutionHost from '#lib/create-module-resolution-host'
import type { ModuleId } from '@flex-development/mlly'
import type {
  Awaitable,
  List,
  ModuleResolutionHost,
  ParseConfigHost,
  ParseConfigHostOptions
} from '@flex-development/tsconfig-utils'

/**
 * Create a configuration parser host.
 *
 * The parser host provides methods for accessing the file system
 * and resolving module paths.
 *
 * > 👉 **Note**: The host can have both asynchronous and synchronous methods,
 * > but when used with the native TypeScript compiler, all methods must return
 * > synchronous values.
 *
 * @see {@linkcode ParseConfigHostOptions}
 * @see {@linkcode ParseConfigHost}
 *
 * @this {void}
 *
 * @param {ParseConfigHostOptions | null | undefined} [options]
 *  Options for host creation
 * @return {ParseConfigHost}
 *  The parse config host
 */
function createParseConfigHost(
  this: void,
  options?: ParseConfigHostOptions | null | undefined
): ParseConfigHost {
  /**
   * The module resolution host.
   *
   * @const {ModuleResolutionHost} host
   */
  const host: ModuleResolutionHost = createModuleResolutionHost(options)

  /**
   * Whether to treat file names as case sensitive.
   *
   * @var {boolean} useCaseSensitiveFileNames
   */
  let useCaseSensitiveFileNames: boolean = !!host.useCaseSensitiveFileNames

  // determine if file names should be treated as case sensitive.
  if (typeof host.useCaseSensitiveFileNames === 'function') {
    useCaseSensitiveFileNames = !!host.useCaseSensitiveFileNames()
  }

  return {
    directoryExists: host.directoryExists.bind(host),
    fileExists: host.fileExists.bind(host),
    getCurrentDirectory: host.getCurrentDirectory.bind(host),
    getDirectories: host.getDirectories.bind(host),
    readDirectory,
    readFile: host.readFile.bind(host),
    realpath: host.realpath.bind(host),
    useCaseSensitiveFileNames
  }

  /**
   * @template {Awaitable<ReadonlyArray<string>>} T
   *  The list of matched files
   *
   * @this {unknown}
   *
   * @param {ModuleId} parent
   *  The module id of the parent directory
   * @param {List<string> | null | undefined} [extensions]
   *  The list of file extensions to filter for
   * @param {List<string> | null | undefined} [exclude]
   *  The list of glob patterns matching files to exclude
   * @param {List<string> | null | undefined} [include]
   *  The list of glob patterns matching files to include
   * @param {number | null | undefined} [depth]
   *  The maximum search depth (inclusive)
   * @return {T}
   *  The listed of matched files
   */
  function readDirectory<T extends Awaitable<readonly string[]>>(
    parent: ModuleId,
    extensions?: List<string> | null | undefined,
    exclude?: List<string> | null | undefined,
    include?: List<string> | null | undefined,
    depth?: number | null | undefined
  ): T

  /**
   * @this {ParseConfigHost}
   *
   * @param {ModuleId} parent
   *  The module id of the parent directory
   * @param {List<string> | null | undefined} [extensions]
   *  The list of file extensions to filter for
   * @param {List<string> | null | undefined} [exclude]
   *  The list of glob patterns matching files to exclude
   * @param {List<string> | null | undefined} [include]
   *  The list of glob patterns matching files to include
   * @param {number | null | undefined} [depth]
   *  The maximum search depth (inclusive)
   * @return {Awaitable<ReadonlyArray<string>>}
   *  The listed of matched files
   */
  function readDirectory(
    this: ParseConfigHost,
    parent: ModuleId,
    extensions?: List<string> | null | undefined,
    exclude?: List<string> | null | undefined,
    include?: List<string> | null | undefined,
    depth?: number | null | undefined
  ): Awaitable<readonly string[]> {
    return matchFiles(
      this,
      parent,
      extensions,
      exclude,
      include,
      useCaseSensitiveFileNames,
      depth,
      getFileSystemEntries,
      options?.fs
    )
  }
}

export default createParseConfigHost
