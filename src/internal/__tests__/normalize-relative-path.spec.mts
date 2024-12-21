/**
 * @file Unit Tests - normalizeRelativePaths
 * @module tsconfig-utils/internal/tests/unit/normalizeRelativePaths
 */

import tsconfigB from '#fixtures/tsconfig.build.json' with { type: 'json' }
import tsconfig from '#fixtures/tsconfig.json' with { type: 'json' }
import testSubject from '#internal/normalize-relative-paths'
import mergeTsconfig from '#lib/merge-tsconfig'
import pathe from '@flex-development/pathe'
import type { JsonValue } from '@flex-development/tsconfig-utils'

describe('unit:internal/normalizeRelativePaths', () => {
  it.each<[URL, URL | null, JsonValue, string | null]>([
    [
      pathe.pathToFileURL('__fixtures__/tsconfig.build.json'),
      pathe.pathToFileURL('tsconfig.json'),
      mergeTsconfig(null, tsconfig, tsconfigB),
      null
    ],
    [
      pathe.pathToFileURL('__fixtures__/tsconfig.build.json'),
      null,
      '../dist',
      'exclude.*'
    ]
  ])('should return `value` with normalized relative paths (%#)', (
    url,
    parent,
    value,
    key
  ) => {
    // Act
    const result = testSubject(url, parent ?? url, value, key, new Set([
      'compilerOptions.baseUrl',
      'compilerOptions.outDir',
      'compilerOptions.paths.*',
      'compilerOptions.paths.*.*',
      'compilerOptions.rootDir',
      'exclude.*',
      'files.*',
      'include.*'
    ]))

    // Expect
    expect(result).to.eq(value)
    expect(result).toMatchSnapshot()
  })
})
