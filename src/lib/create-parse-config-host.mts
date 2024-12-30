/**
 * @file createParseConfigHost
 * @module tsconfig-utils/lib/createParseConfigHost
 */

import matchFiles from '#internal/match-files'
import createModuleResolutionHost from '#lib/create-module-resolution-host'
import type { ModuleId } from '@flex-development/mlly'
import type {
  ModuleResolutionHost,
  ParseConfigHost,
  ParseConfigHostOptions
} from '@flex-development/tsconfig-utils'

/**
 * Create a parse config host.
 *
 * @see {@linkcode ParseConfigHostOptions}
 * @see {@linkcode ParseConfigHost}
 *
 * @this {void}
 *
 * @param {ParseConfigHostOptions | null | undefined} [options]
 *  Host options
 * @return {ParseConfigHost}
 *  Parse config host object
 */
function createParseConfigHost(
  this: void,
  options?: ParseConfigHostOptions | null | undefined
): ParseConfigHost {
  /**
   * Module resolution host object.
   *
   * @const {ModuleResolutionHost} host
   */
  const host: ModuleResolutionHost = createModuleResolutionHost(options)

  /**
   * Treat filenames as case-sensitive?
   *
   * @var {boolean} useCaseSensitiveFileNames
   */
  let useCaseSensitiveFileNames: boolean = !!host.useCaseSensitiveFileNames

  if (typeof host.useCaseSensitiveFileNames === 'function') {
    useCaseSensitiveFileNames = host.useCaseSensitiveFileNames()
  }

  return {
    directoryExists: host.directoryExists,
    fileExists: host.fileExists,
    getCurrentDirectory: host.getCurrentDirectory,
    getDirectories: host.getDirectories,
    readDirectory,
    readFile: host.readFile,
    realpath: host.realpath,
    useCaseSensitiveFileNames
  }

  /**
   * Get a list of files in a directory.
   *
   * @this {void}
   *
   * @param {ModuleId} id
   *  The directory path or URL to read
   * @param {Set<string> | ReadonlyArray<string> | undefined} [extensions]
   *  List of file extensions to filter for
   * @param {Set<string> | ReadonlyArray<string> | undefined} [exclude]
   *  List of glob patterns matching files to exclude
   * @param {Set<string> | ReadonlyArray<string> | undefined} [include]
   *  List of glob patterns matching files to include
   * @param {number | null | undefined} [depth]
   *  Maximum search depth (inclusive)
   * @return {ReadonlyArray<string>}
   *  List of files under directory at `id`
   */
  function readDirectory(
    this: void,
    id: ModuleId,
    extensions: Set<string> | readonly string[] | undefined,
    exclude: Set<string> | readonly string[] | undefined,
    include: Set<string> | readonly string[] | undefined,
    depth?: number | null | undefined
  ): readonly string[] {
    return Object.freeze(matchFiles(
      host,
      id,
      extensions,
      exclude,
      include,
      useCaseSensitiveFileNames,
      depth,
      options?.fs
    ))
  }
}

export default createParseConfigHost
