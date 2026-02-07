/**
 * @file Interfaces - IsSymbolicLink
 * @module tsconfig-utils/interfaces/IsSymbolicLink
 */

/**
 * Check if a file system entry is a symbolic link.
 */
interface IsSymbolicLink {
  /**
   * @this {unknown}
   *
   * @return {boolean}
   *  `true` if entry is symbolic link, `false` otherwise
   */
  (): boolean
}

export type { IsSymbolicLink as default }
