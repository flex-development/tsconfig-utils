/**
 * @file Unit Tests - loadTsconfig
 * @module tsconfig-utils/lib/tests/unit/loadTsconfig
 */

import fsa from '#fixtures/fsa'
import dfs from '#internal/fs'
import isResolvedTsconfig from '#lib/is-resolved-tsconfig'
import testSubject from '#lib/load-tsconfig'
import fsCaseType, { type FileSystemCaseType } from '#tests/utils/fs-case-type'
import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type { FileSystem } from '@flex-development/tsconfig-utils'
import { isThenable } from '@flex-development/when'

describe('unit:lib/loadTsconfig', () => {
  describe.each<[fst: FileSystemCaseType, fs: FileSystem]>([
    [fsCaseType.default, dfs],
    [fsCaseType.onlyAsync, fsa]
  ])('fs (%s)', (fsType, fs) => {
    type Case = Parameters<typeof testSubject>

    let isAsync: boolean

    beforeAll(() => {
      isAsync = fs === fsa
    })

    it.each<Case>([
      [null, { cwd: pathe.sep }],
      ['@tsconfig/node10/tsconfig.json']
    ])('should return `null` if tsconfig is not found (%j)', async (
      id,
      options
    ) => {
      // Act
      const result = testSubject(id, { ...options, fs })

      // Expect
      expect(isAsync ? await result : result).to.be.null
    })

    it.each<Case>([
      ['#fixtures/tsconfigs/tsconfig.build.json', { parent: import.meta.url }],
      ['#fixtures/tsconfigs/tsconfig.json'],
      ['./__fixtures__/tsconfigs/tsconfig.node10.json'],
      ['./__fixtures__/tsconfigs/tsconfig.spec.json'],
      ['__fixtures__/tsconfigs/tsconfig.prod.json'],
      ['__fixtures__/tsconfigs/tsconfig.test.json', { parent: mlly.cwd() }]
    ])('should return resolved tsconfig (%j)', async (
      id,
      options
    ) => {
      // Act
      let result = testSubject(id, { ...options, fs })

      // Expect (promises)
      if (isAsync) {
        expect(result).to.satisfy(isThenable), result = await result
      } else {
        expect(result).to.not.satisfy(isThenable)
      }

      // Expect (result)
      expect(result).to.satisfy(isResolvedTsconfig)
      expect(result).toMatchSnapshot()
    })
  })
})
