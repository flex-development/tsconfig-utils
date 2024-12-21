/**
 * @file Interfaces - ReadTsconfigOptions
 * @module tsconfig-utils/interfaces/ReadTsconfigOptions
 */

import type {
  GetSourceOptions,
  MainField,
  ModuleId
} from '@flex-development/mlly'
import type { Condition } from '@flex-development/pkg-types'

/**
 * Options for reading tsconfig files.
 *
 * @see {@linkcode GetSourceOptions}
 *
 * @extends {GetSourceOptions}
 */
interface ReadTsconfigOptions extends GetSourceOptions {
  /**
   * List of export/import conditions.
   *
   * > 👉 **Note**: Should be sorted by priority.
   *
   * @see {@linkcode Condition}
   * @see https://nodejs.org/api/packages.html#conditional-exports
   *
   * @default mlly.defaultConditions
   */
  conditions?: Condition[] | Set<Condition> | null | undefined

  /**
   * URL of current working directory.
   *
   * @see {@linkcode ModuleId}
   *
   * @default mlly.cwd()
   */
  cwd?: ModuleId | null | undefined

  /**
   * List of legacy `main` fields.
   *
   * > 👉 **Note**: Should be sorted by priority.
   *
   * @see {@linkcode MainField}
   *
   * @default mlly.defaultMainFields
   */
  mainFields?: MainField[] | Set<MainField> | null | undefined

  /**
   * Parent module id.
   *
   * @see {@linkcode ModuleId}
   *
   * @default
   *  cwd ?? mlly.cwd()
   */
  parent?: ModuleId | null | undefined

  /**
   * Keep symlinks instead of resolving them.
   */
  preserveSymlinks?: boolean | null | undefined
}

export type { ReadTsconfigOptions as default }
