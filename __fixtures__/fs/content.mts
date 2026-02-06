/**
 * @file Fixtures - content
 * @module fixtures/fs/content
 */

import directories from '#fixtures/fs/directories'
import files from '#fixtures/fs/files'
import constant from '#internal/constant'
import { defaultExtensions as extensions } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type { Dirent } from '@flex-development/tsconfig-utils'

/**
 * A directory content list.
 *
 * @see {@linkcode Dirent}
 *
 * @const {Dirent[]} content
 */
const content: Dirent[] = []

// add dirents representing subdirectories.
for (const name of directories) {
  content.push({
    isDirectory: constant(true),
    isFile: constant(false),
    isSymbolicLink: constant(name === directories[1]),
    name,
    parentPath: pathe.cwd()
  })
}

// add dirents representing files.
for (const name of files) {
  content.push({
    isDirectory: constant(false),
    isFile: constant(true),
    isSymbolicLink: () => !(extensions as Set<string>).has(pathe.extname(name)),
    name,
    parentPath: pathe.cwd()
  })
}

export default content
