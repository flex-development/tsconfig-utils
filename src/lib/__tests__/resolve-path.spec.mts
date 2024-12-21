/**
 * @file Unit Tests - resolvePath
 * @module tsconfig-utils/lib/tests/unit/resolvePath
 */

import testSubject from '#lib/resolve-path'
import pathe from '@flex-development/pathe'

describe('unit:lib/resolvePath', () => {
  it('should return `null` if path alias match is not found', () => {
    expect(testSubject('@src/lib/resolve-path')).to.be.null
  })

  it.each<Parameters<typeof testSubject>>([
    ['#internal/with-trailing-slash', {
      tsconfig: {
        compilerOptions: {
          baseUrl: pathe.dot,
          paths: {
            '#internal/*': ['src/internal/*']
          }
        }
      }
    }],
    ['#lib/is-resolved-tsconfig', {
      tsconfig: {
        tsconfig: {
          compilerOptions: {
            paths: {
              '#lib/*': ['src/lib/*']
            }
          }
        },
        url: pathe.pathToFileURL('tsconfig.json')
      }
    }],
    ['https://esm.sh/@flex-development/unist-util-builder', {
      tsconfig: {
        compilerOptions: {
          paths: {
            'https://esm.sh/@flex-development/unist-util-builder': [
              'typings/@flex-development/unist-util-builder/index.d.mts'
            ]
          }
        },
        cwd: pathe.cwd()
      }
    }],
    ['https://esm.sh/lodash@4.17.21', {
      tsconfig: {
        tsconfig: {
          compilerOptions: {
            baseUrl: pathe.dot,
            paths: {
              'https://esm.sh/lodash@4.17.21': [
                'node_modules/@types/lodash/index.d.ts'
              ]
            }
          }
        },
        url: pathe.pathToFileURL('__fixtures__/tsconfig.json')
      }
    }]
  ])('should return resolved specifier (%j)', (specifier, options) => {
    // Act
    const result = testSubject(specifier, options)

    // Expect
    expect(result).to.be.a('string')
    expect(result).toMatchSnapshot()
  })
})
