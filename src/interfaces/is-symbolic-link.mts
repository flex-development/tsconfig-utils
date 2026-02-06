/**
 * @file Interfaces - IsSymbolicLink
 * @module tsconfig-utils/interfaces/IsSymbolicLink
 */

/**
 * Check if a dirent or stats object describes a symbolic link.
 */
interface IsSymbolicLink {
  /**
   * @this {unknown}
   *
   * @return {boolean}
   *  `true` if object describes symbolic link, `false` otherwise
   */
  (): boolean
}

export type { IsSymbolicLink as default }
