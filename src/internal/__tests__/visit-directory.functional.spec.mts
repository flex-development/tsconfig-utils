/**
 * @file Unit Tests - visitDirectory
 * @module tsconfig-utils/internal/tests/unit/visitDirectory
 */

import emptyString from '#fixtures/empty-string'
import fsa from '#fixtures/fs/fsa'
import type MatcherPatterns from '#interfaces/matcher-patterns'
import getFileSystemEntries from '#internal/get-file-system-entries'
import getMatcherPatterns from '#internal/get-matcher-patterns'
import isPromise from '#internal/is-promise'
import testSubject from '#internal/visit-directory'
import withTrailingSlash from '#internal/with-trailing-slash'
import createGetCanonicalFileName from '#lib/create-get-canonical-file-name'
import fsCaseType, { type FileSystemCaseType } from '#tests/utils/fs-case-type'
import tsconfig from '#tsconfig' with { type: 'json' }
import { defaultExtensions } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type {
  FileSystem,
  GetCanonicalFileName
} from '@flex-development/tsconfig-utils'
import tsconfigBuild from '../../../tsconfig.build.json' with { type: 'json' }

describe('unit:internal/visitDirectory', () => {
  describe.each<[fst: FileSystemCaseType, fs?: FileSystem | null | undefined]>([
    [fsCaseType.default],
    [fsCaseType.onlyAsync, fsa]
  ])('fs (%s)', (fsType, fs) => {
    type Case = [
      parent: string | null | undefined,
      current: string,
      visited: Map<string, boolean>,
      depth: number | null | undefined,
      patterns: MatcherPatterns
    ]

    let gcf: GetCanonicalFileName
    let files: string[]
    let isAsync: boolean

    beforeAll(() => {
      isAsync = fs === fsa
    })

    beforeEach(() => {
      files = []
    })

    it.each<Case>([
      [
        null,
        pathe.cwd(),
        new Map(),
        null,
        getMatcherPatterns(
          defaultExtensions,
          tsconfig.exclude,
          tsconfig.include,
          true
        )
      ],
      [
        emptyString,
        pathe.cwd(),
        new Map([
          [pathe.resolve('src/interfaces'), true],
          [pathe.resolve('src/internal'), true],
          [pathe.resolve('src/lib'), true],
          [withTrailingSlash(pathe.resolve('src/types')), true]
        ]),
        -1,
        getMatcherPatterns(
          defaultExtensions,
          tsconfigBuild.exclude,
          tsconfigBuild.include,
          true
        )
      ],
      [
        'src',
        pathe.cwd(),
        new Map([[pathe.resolve('src'), true]]),
        undefined,
        getMatcherPatterns(
          defaultExtensions,
          tsconfigBuild.exclude,
          tsconfigBuild.include,
          true
        )
      ]
    ])('should not revisit `parent` (%#)', async (
      parent,
      current,
      visited,
      depth,
      patterns
    ) => {
      // Arrange
      gcf = createGetCanonicalFileName(patterns.useCaseSensitiveFileNames)
      if (!visited.size) visited.set(current, true)

      // Act
      let result = testSubject(
        files,
        parent,
        current,
        visited,
        depth,
        patterns,
        gcf,
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
      expect(result).to.be.undefined
      expect(files).to.have.length(new Set(files).size)
      expect(files).toMatchSnapshot()
    })
  })
})
