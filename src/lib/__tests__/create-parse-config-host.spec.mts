/**
 * @file Unit Tests - createParseConfigHost
 * @module tsconfig-utils/lib/tests/unit/createParseConfigHost
 */

import fsa from '#fixtures/fsa'
import emptyArray from '#internal/empty-array'
import dfs from '#internal/fs'
import testSubject from '#lib/create-parse-config-host'
import fsCaseType, { type FileSystemCaseType } from '#tests/utils/fs-case-type'
import * as mlly from '@flex-development/mlly'
import type {
  FileSystem,
  ParseConfigHost
} from '@flex-development/tsconfig-utils'
import { isThenable } from '@flex-development/when'

describe('unit:lib/createParseConfigHost', () => {
  it.each<Parameters<typeof testSubject>>([
    [],
    [
      {
        useCaseSensitiveFileNames: true
      }
    ],
    [
      {
        useCaseSensitiveFileNames: vi.fn().mockName('useCaseSensitiveFileNames')
      }
    ]
  ])('should create parse config host (%#)', options => {
    expect(testSubject(options)).toMatchSnapshot()
  })

  describe.each<[fst: FileSystemCaseType, fs: FileSystem]>([
    [fsCaseType.default, dfs],
    [fsCaseType.onlyAsync, fsa]
  ])('fs (%s)', (fsType, fs) => {
    let isAsync: boolean

    beforeAll(() => {
      isAsync = fs === fsa
    })

    describe('readDirectory', () => {
      let subject: ParseConfigHost

      beforeAll(() => {
        subject = testSubject({ fs })
      })

      it('should return list of matched files', async () => {
        // Act
        let result = subject.readDirectory(
          mlly.cwd(),
          mlly.defaultExtensions,
          emptyArray,
          emptyArray,
          1
        )

        // Expect (promises)
        if (isAsync) {
          expect(result).to.satisfy(isThenable), result = await result
        } else {
          expect(result).to.not.satisfy(isThenable)
        }

        // Expect (result)
        expect(result).to.be.an('array').and.empty
      })
    })
  })
})
