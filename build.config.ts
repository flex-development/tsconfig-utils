/**
 * @file Configuration - Build
 * @module config/build
 * @see https://github.com/flex-development/mkbuild
 */

import { defineBuildConfig, type Config } from '@flex-development/mkbuild'
import pathe from '@flex-development/pathe'
import pkg from './package.json' assert { type: 'json' }
import tsconfig from './tsconfig.build.json' assert { type: 'json' }

/**
 * Build configuration options.
 *
 * @const {Config} config
 */
const config: Config = defineBuildConfig({
  charset: 'utf8',
  entries: [
    { dts: 'only' },
    { dts: false, pattern: ['interfaces/index.ts'] },
    {
      dts: false,
      pattern: ['index.ts', 'internal/*', 'utils/*'],
      sourceRoot: 'file' + pathe.delimiter + pathe.sep.repeat(2),
      sourcemap: true
    }
  ],
  minifySyntax: true,
  target: [
    pkg.engines.node.replace(/^\D+/, 'node'),
    tsconfig.compilerOptions.target
  ],
  tsconfig: 'tsconfig.build.json'
})

export default config
