/**
 * @file Interfaces - ReadTsconfigOptions
 * @module tsconfig-utils/interfaces/ReadTsconfigOptions
 */

import type {
  Condition,
  GetSourceOptions,
  MainField,
  ModuleId
} from '@flex-development/mlly'
import type { List } from '@flex-development/tsconfig-utils'

/**
 * Options for reading tsconfig files.
 *
 * @see {@linkcode GetSourceOptions}
 *
 * @extends {GetSourceOptions}
 */
interface ReadTsconfigOptions extends GetSourceOptions {
  /**
   * The list of export/import conditions.
   *
   * > 👉 **Note**: Should be sorted by priority.
   *
   * @see {@linkcode Condition}
   * @see {@linkcode List}
   * @see https://nodejs.org/api/packages.html#conditional-exports
   *
   * @default mlly.defaultConditions
   */
  conditions?: List<Condition> | null | undefined

  /**
   * The URL of the current working directory.
   *
   * @see {@linkcode ModuleId}
   *
   * @default mlly.cwd()
   */
  cwd?: ModuleId | null | undefined

  /**
   * The list of legacy `main` fields.
   *
   * > 👉 **Note**: Should be sorted by priority.
   *
   * @see {@linkcode List}
   * @see {@linkcode MainField}
   *
   * @default mlly.defaultMainFields
   */
  mainFields?: List<MainField> | null | undefined

  /**
   * The parent module id.
   *
   * @see {@linkcode ModuleId}
   *
   * @default
   *  cwd ?? mlly.cwd()
   */
  parent?: ModuleId | null | undefined

  /**
   * Whether to keep symlinks instead of resolving them.
   */
  preserveSymlinks?: boolean | null | undefined
}

export type { ReadTsconfigOptions as default }
