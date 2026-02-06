/**
 * @file Fixtures - tsconfigBuild
 * @module fixtures/tsconfigBuild
 */

import type { Tsconfig } from '@flex-development/tsconfig-types'

/**
 * A TypeScript configuration for a production build.
 *
 * @see {@linkcode Tsconfig}
 *
 * @type {Tsconfig}
 */
const tsconfig: Tsconfig = {
  extends: '../tsconfig.json'
}

export default tsconfig
