/**
 * @file Interfaces - ParseConfigHostOptions
 * @module tsconfig-utils/interfaces/ParseConfigHostOptions
 */

import type {
  ModuleResolutionHostOptions
} from '@flex-development/tsconfig-utils'

/**
 * Options for creating parse config hosts.
 *
 * @see {@linkcode ModuleResolutionHostOptions}
 *
 * @extends {ModuleResolutionHostOptions}
 */
interface ParseConfigHostOptions extends ModuleResolutionHostOptions {}

export type { ParseConfigHostOptions as default }
