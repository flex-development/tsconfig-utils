/**
 * @file Usage Example
 * @module example
 */

import {
  loadTsconfig,
  type ResolvedTsconfig
} from '@flex-development/tsconfig-utils'
import fs from 'node:fs'

/**
 * The resolved tsconfig.
 *
 * @const {ResolvedTsconfig | null} resolved
 */
const resolved: ResolvedTsconfig | null = await loadTsconfig(null, {
  encoding: 'utf8',
  fs: fs.promises
})

if (resolved) {
  console.dir(resolved.tsconfig) // the loaded tsconfig, with bases applied
  console.dir(resolved.url) // the url of the tsconfig file
}
