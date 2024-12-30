/**
 * @file Unit Tests - matchFiles
 * @module tsconfig-utils/internal/tests/unit/matchFiles
 */

import testSubject from '#internal/match-files'
import toPath from '#internal/to-path'
import createModuleResolutionHost from '#lib/create-module-resolution-host'
import * as mlly from '@flex-development/mlly'
import type { FileSystem } from '@flex-development/tsconfig-utils'
import { alphabetize, identity } from '@flex-development/tutils'
import ts from 'typescript'
import tsconfig from '../../../tsconfig.json' with { type: 'json' }

describe('unit:internal/matchFiles', () => {
  it.each<[
    id: mlly.ModuleId,
    extensions: Set<string> | readonly string[] | undefined,
    exclude: Set<string> | readonly string[] | undefined,
    include: Set<string> | readonly string[] | undefined,
    useCaseSensitiveFileNames?: boolean | null | undefined,
    depth?: number | null | undefined,
    fs?: FileSystem | null | undefined
  ]>([
    [
      new URL('src', mlly.cwd()),
      ['.cjs', '.cts', '.js', '.json', '.mjs', '.mts', '.ts'],
      tsconfig.exclude,
      tsconfig.include,
      null,
      0
    ],
    [
      mlly.cwd(),
      ['.cjs', '.cts', '.js', '.json', '.mjs', '.mts', '.ts'],
      tsconfig.exclude,
      tsconfig.include
    ],
    [
      mlly.cwd(),
      ['.mjs', '.mts', '.ts'],
      tsconfig.exclude,
      tsconfig.include,
      undefined,
      1
    ]
  ])('should return list of files under directory at `id` (%#)', (
    id,
    extensions,
    exclude,
    include,
    useCaseSensitiveFileNames,
    depth,
    fs
  ) => {
    // Arrange
    const expected: readonly string[] = alphabetize(ts.sys.readDirectory(
      toPath(id),
      extensions ? [...extensions] : undefined,
      exclude ? [...exclude] : undefined,
      include ? [...include] : undefined,
      depth ?? undefined
    ), identity)

    // Act
    const result = testSubject(
      createModuleResolutionHost(),
      id,
      extensions,
      exclude,
      include,
      useCaseSensitiveFileNames,
      depth,
      fs
    )

    // Expect
    expect(result).to.be.an('array').and.eql(expected).and.not.be.frozen
  })
})
