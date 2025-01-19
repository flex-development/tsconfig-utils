/**
 * @file Unit Tests - matchFiles
 * @module tsconfig-utils/internal/tests/unit/matchFiles
 */

import testSubject from '#internal/match-files'
import toPath from '#internal/to-path'
import createModuleResolutionHost from '#lib/create-module-resolution-host'
import type { Extensions } from '@flex-development/fst-util-from-fs'
import * as mlly from '@flex-development/mlly'
import type { FileSystem } from '@flex-development/tsconfig-utils'
import { alphabetize, identity } from '@flex-development/tutils'
import ts from 'typescript'
import tsconfigBuild from '../../../tsconfig.build.json' with { type: 'json' }
import tsconfig from '../../../tsconfig.json' with { type: 'json' }

describe('unit:internal/matchFiles', () => {
  it.each<[
    id: mlly.ModuleId,
    extensions: Extensions | null | undefined,
    exclude: Set<string> | readonly string[] | null | undefined,
    include: Set<string> | readonly string[] | null | undefined,
    useCaseSensitiveFileNames?: boolean | null | undefined,
    depth?: number | null | undefined,
    fs?: Partial<FileSystem> | null | undefined
  ]>([
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
    ],
    [
      mlly.cwd(),
      ['.mts'],
      tsconfigBuild.exclude,
      tsconfigBuild.include
    ],
    [
      new URL('src', mlly.cwd()),
      ['.cjs', '.cts', '.js', '.json', '.mjs', '.mts', '.ts'],
      tsconfig.exclude,
      tsconfig.include,
      null,
      0
    ]
  ])('should return list of matched files (%#)', (
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
    expect(result).to.be.an('array').and.eql(expected).and.be.frozen
  })
})
