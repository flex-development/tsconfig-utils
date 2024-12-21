declare module '#internal/fs' {
  import type { FileSystem } from '@flex-development/tsconfig-utils'

  /**
   * File system API.
   *
   * @const {FileSystem} fs
   */
  const fs: FileSystem

  export default fs
}
