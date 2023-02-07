/**
 * @file Utilities - loadTsconfig
 * @module tsconfig-utils/utils/loadTsconfig
 */

import type { LoadTsconfigOptions } from '#src/interfaces'
import * as internal from '#src/internal'
import {
  ERR_INVALID_RETURN_VALUE,
  ERR_OPERATION_FAILED,
  type NodeError
} from '@flex-development/errnode'
import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type {
  CompilerOptions,
  CompilerOptionsValue,
  TSConfig
} from '@flex-development/tsconfig-types'
import {
  isNIL,
  isObjectPlain,
  isString,
  type Nilable,
  type Nullable
} from '@flex-development/tutils'
import { mergeAndCompare } from 'merge-anything'
import sortKeys from 'sort-keys'

/**
 * Reads and parses the [tsconfig][1] file at the given module `id`.
 *
 * If the tsconfig file is found, comments and [byte order marks (BOMs)][2] will
 * be removed before parsing. If successfully parsed, an object representation
 * of the tsconfig file will be returned.
 *
 * [Extending tsconfig files][3] is also supported. If not overwritten, the
 * [`baseUrl`][4], [`outDir`][5], and [`rootDir`][6] properties from the base
 * tsconfig file will be made relative to the tsconfig file being loaded.
 *
 * [1]: https://www.typescriptlang.org/tsconfig
 * [2]: https://en.wikipedia.org/wiki/Byte_order_mark#UTF-8
 * [3]: https://www.typescriptlang.org/tsconfig#extends
 * [4]: https://www.typescriptlang.org/tsconfig#baseUrl
 * [5]: https://www.typescriptlang.org/tsconfig#outDir
 * [6]: https://www.typescriptlang.org/tsconfig#rootDir
 *
 * @param {mlly.ModuleId} id - Module id of tsconfig file
 * @param {LoadTsconfigOptions} [options={}] - Load options
 * @return {Nullable<TSConfig>} `TSConfig` object or `null`
 * @throws {NodeError<Error | TypeError>}
 */
const loadTsconfig = (
  id: mlly.ModuleId,
  options: LoadTsconfigOptions = {}
): Nullable<TSConfig> => {
  const { file = internal.isFile, read = internal.readFile } = options

  // ensure id is an instance of URL or a string
  internal.validateURLString(id, 'id')

  // ensure option schemas
  internal.validateFunction(file, 'options.file')
  internal.validateFunction(read, 'options.read')

  // ensure id is an instance of URL
  id = mlly.toURL(id)

  // ensure module id includes '.json' extension
  if (!id.href.endsWith('.json')) id = mlly.toURL(id.href + '.json')

  // exit early if tsconfig file is not a file
  if (!file(id)) return null

  /**
   * Tsconfig file content.
   *
   * @const {string} content
   */
  const content: string = read(id)

  // exit early if tsconfig file is empty
  if (!content.trim()) return {}

  /**
   * Tsconfig object.
   *
   * @var {Nullable<TSConfig>} tsconfig
   */
  let tsconfig: Nullable<TSConfig> = {}

  // parse tsconfig file
  try {
    tsconfig = internal.parseJSON<TSConfig>(content)
  } catch (e: unknown) {
    throw new ERR_OPERATION_FAILED((e as Error).message)
  }

  // throw if tsconfig is not plain object
  if (!isObjectPlain(tsconfig)) {
    throw new ERR_INVALID_RETURN_VALUE('a plain object', 'parseJSON', tsconfig)
  }

  /**
   * Configuration files to inherit from.
   *
   * @const {string[]} bases
   */
  const bases: string[] = isNIL(tsconfig.extends)
    ? []
    : [tsconfig.extends].flat().filter(extend => !!extend.trim())

  // try merging tsconfig and base tsconfigs
  for (const extend of bases) {
    /**
     * Absolute path to base tsconfig file.
     *
     * @const {string} basepath
     */
    const basepath: string = pathe.join(
      pathe.dirname(id.pathname),
      (extend + '.json').replace(/(\.json\.json)$/, '.json')
    )

    /**
     * Base tsconfig object.
     *
     * @const {Nullable<TSConfig>} base
     */
    const base: Nullable<TSConfig> = loadTsconfig(basepath, { file, read })

    // merge tsconfig objects if base tsconfig object was found
    if (base) {
      /**
       * Compares values from a base tsconfig file and inheriting tsconfig
       * file to determine how the values should be merged.
       *
       * @param {Nilable<CompilerOptions | CompilerOptionsValue>} b - Value
       * from base tsconfig object, {@linkcode base}
       * @param {Nilable<CompilerOptions | CompilerOptionsValue>} t - Value
       * from inheriting tsconfig object, {@linkcode tsconfig}
       * @param {string | symbol} key - Object key being evaluated
       * @return {Nilable<CompilerOptions | CompilerOptionsValue>} Merge value
       */
      const compare = (
        b: Nilable<CompilerOptions | CompilerOptionsValue>,
        t: Nilable<CompilerOptions | CompilerOptionsValue>,
        key: string | symbol
      ): Nilable<CompilerOptions | CompilerOptionsValue> => {
        /**
         * Merge value.
         *
         * @var {Nilable<CompilerOptions | CompilerOptionsValue>} merged
         */
        let merged: Nilable<CompilerOptions | CompilerOptionsValue> = t

        // determine how to merge values
        switch (true) {
          // relative paths should be interpreted as relative to base, but
          // they need also need to be relative to inheriting tsconfig
          case key === 'baseUrl' && isString(b):
          case key === 'outDir' && isString(b):
          case key === 'rootDir' && isString(b):
            if (b === t) merged = pathe.join(pathe.dirname(extend), b as string)
            break
          // recursively merge compilerOptions
          case key === 'compilerOptions':
            merged = mergeAndCompare(compare, b, t) as CompilerOptions
            merged = sortKeys(merged)
            break
          // exclude, files, and include properties from inheriting tsconfig
          // file should overwrite those from base tsconfig file.
          case key === 'exclude':
          case key === 'files':
          case key === 'include':
            merged = t ?? /* c8 ignore next */ b
            break
          // references is the only top-level property excluded from inheritance
          case key === 'references':
            break
          default:
            break
        }

        return merged
      }

      // merge tsconfig objects
      tsconfig = mergeAndCompare(compare, base, tsconfig)
    }
  }

  return sortKeys(tsconfig)
}

export default loadTsconfig
