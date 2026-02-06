/**
 * @file Unit Tests - matchFiles
 * @module tsconfig-utils/internal/tests/unit/matchFiles
 */

import fsa from '#fixtures/fs/fsa'
import emptyArray from '#internal/empty-array'
import getFileSystemEntries from '#internal/get-file-system-entries'
import isPromise from '#internal/is-promise'
import testSubject from '#internal/match-files'
import createModuleResolutionHost from '#lib/create-module-resolution-host'
import fsCaseType, { type FileSystemCaseType } from '#tests/utils/fs-case-type'
import tsconfig from '#tsconfig' with { type: 'json' }
import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type {
  FileSystem,
  List,
  ModuleResolutionHost
} from '@flex-development/tsconfig-utils'
import ts from 'typescript'
import tsconfigBuild from '../../../tsconfig.build.json' with { type: 'json' }

describe('unit:internal/matchFiles', () => {
  describe.each<[fst: FileSystemCaseType, fs?: FileSystem | null | undefined]>([
    [fsCaseType.default],
    [fsCaseType.onlyAsync, fsa]
  ])('fs (%s)', (fsType, fs) => {
    type Case = [
      parent: mlly.ModuleId,
      extensions: List<string> | null | undefined,
      exclude: List<string> | null | undefined,
      include: List<string> | null | undefined,
      useCaseSensitiveFileNames: boolean | null | undefined,
      depth: number | null | undefined
    ]

    let host: ModuleResolutionHost
    let isAsync: boolean

    beforeAll(() => {
      host = createModuleResolutionHost({ fs })
      isAsync = fs === fsa
    })

    it.each<Case>([
      [
        mlly.cwd(),
        emptyArray,
        tsconfig.exclude,
        tsconfig.include,
        true,
        null
      ],
      [
        mlly.cwd(),
        mlly.defaultExtensions,
        tsconfig.exclude,
        tsconfig.include,
        true,
        undefined
      ],
      [
        mlly.cwd(),
        mlly.defaultExtensions,
        tsconfigBuild.exclude,
        tsconfigBuild.include,
        true,
        -1
      ],
      [
        mlly.cwd(),
        mlly.defaultExtensions,
        tsconfigBuild.exclude,
        new Set(['src']),
        true,
        null
      ],
      [
        mlly.cwd(),
        mlly.defaultExtensions,
        tsconfig.exclude,
        tsconfig.include,
        true,
        3
      ],
      [
        pathe.pathToFileURL('source'),
        mlly.defaultExtensions,
        tsconfig.exclude,
        tsconfig.include,
        true,
        2
      ],
      [
        pathe.pathToFileURL('src'),
        mlly.defaultExtensions,
        tsconfigBuild.exclude,
        tsconfigBuild.include,
        true,
        undefined
      ],
      [
        pathe.pathToFileURL('src/types'),
        mlly.defaultExtensions,
        tsconfig.exclude,
        tsconfig.include,
        false,
        1
      ]
    ])('should return list of matched files (%#)', async (
      parent,
      extensions,
      exclude,
      include,
      useCaseSensitiveFileNames,
      depth
    ) => {
      // Arrange
      const expected: readonly string[] = ts.sys.readDirectory(
        pathe.toPath(parent),
        [...extensions ?? []],
        [...exclude ?? []],
        [...include ?? []],
        depth ?? undefined
      )

      // Act
      let result = testSubject(
        host,
        parent,
        extensions,
        exclude,
        include,
        useCaseSensitiveFileNames,
        depth,
        getFileSystemEntries,
        fs
      )

      // Expect (promises)
      if (isAsync) {
        expect(result).to.satisfy(isPromise), result = await result
      } else {
        expect(result).to.not.satisfy(isPromise)
      }

      // Expect (result)
      expect(result).to.be.an('array').and.be.frozen
      expect(result).to.have.length(new Set(result as string[]).size)
      expect(new Set(result as string[])).to.eql(new Set(expected))
    })
  })
})
