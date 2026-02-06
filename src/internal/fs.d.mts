declare module '#internal/fs' {
  import type { FileSystem } from '@flex-development/tsconfig-utils'

  /**
   * The file system API.
   *
   * @const {FileSystem} fs
   */
  const fs: FileSystem

  export default fs
}
