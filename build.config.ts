/**
 * @file Configuration - Build
 * @module config/build
 * @see https://github.com/flex-development/mkbuild
 */

import { defineBuildConfig, type Config } from '@flex-development/mkbuild'
import pathe from '@flex-development/pathe'
import type { BuildResult, PluginBuild } from 'esbuild'
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
    { dts: false, pattern: ['internal/*'] },
    {
      dts: false,
      pattern: ['index.ts', 'utils/*'],
      sourceRoot: pathe.join(
        pkg.repository.replace(/\.git$/, pathe.sep + 'blob'),
        pkg.tagPrefix + pkg.version
      ),
      sourcemap: true,
      sourcesContent: false
    }
  ],
  minifySyntax: true,
  plugins: [
    {
      name: 'fix-sourcemaps',

      /**
       * Makes sourcemap files relative to [`sourceRoot`][1].
       *
       * [1]: https://esbuild.github.io/api/#source-root
       * [2]: https://esbuild.github.io/plugins
       *
       * @see https://github.com/evanw/esbuild/issues/2218
       *
       * @param {PluginBuild} build - [esbuild plugin api][2]
       * @param {PluginBuild['onEnd']} build.onEnd - Build end callback
       * @return {void} Nothing when complete
       */
      setup({ initialOptions, onEnd }: PluginBuild): void {
        return void onEnd((result: BuildResult<{ write: false }>): void => {
          const { absWorkingDir = process.cwd() } = initialOptions

          return void (result.outputFiles = result.outputFiles.map(output => {
            if (output.path.endsWith('.map')) {
              /**
               * Relative path to output file sourcemap is for.
               *
               * **Note**: Relative to {@linkcode absWorkingDir}.
               *
               * @const {string} outfile
               */
              const outfile: string = output.path
                .replace(absWorkingDir, '')
                .replace(/^\//, '')
                .replace(/\.map$/, '')

              /**
               * Parsed sourcemap object.
               *
               * @const {{ sources: string[] }}
               */
              const map: { sources: string[] } = JSON.parse(output.text)

              // reset sources to outfile entry point
              map.sources = [result.metafile!.outputs[outfile]!.entryPoint!]

              // redefine outfile text
              Object.defineProperty(output, 'text', {
                get: (): string => JSON.stringify(map, null, 2)
              })
            }

            return output
          }))
        })
      }
    }
  ],
  target: [
    pkg.engines.node.replace(/^\D+/, 'node'),
    tsconfig.compilerOptions.target
  ],
  tsconfig: 'tsconfig.build.json'
})

export default config
