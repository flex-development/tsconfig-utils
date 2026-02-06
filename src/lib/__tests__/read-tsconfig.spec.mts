/**
 * @file Unit Tests - readTsconfig
 * @module tsconfig-utils/lib/tests/unit/readTsconfig
 */

import fsa from '#fixtures/fs/fsa'
import dfs from '#internal/fs'
import isResolvedTsconfig from '#lib/is-resolved-tsconfig'
import testSubject from '#lib/read-tsconfig'
import fsCaseType, { type FileSystemCaseType } from '#tests/utils/fs-case-type'
import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type { FileSystem } from '@flex-development/tsconfig-utils'

describe('unit:lib/readTsconfig', () => {
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
      ['@tsconfig/node10/tsconfig'],
      ['__fixtures__/tsconfig.json', { cwd: pathe.cwd() }],
      ['__fixtures__/tsconfigs/tsconfig.missing.json'],
      ['data:text/javascript,', { parent: import.meta.url }],
      [new URL('node:test')]
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
      ['#fixtures/tsconfigs/tsconfig.json'],
      ['#fixtures/tsconfigs/tsconfig.test.json', { parent: import.meta.url }],
      ['@tsconfig/strictest/tsconfig', { cwd: mlly.cwd(), encoding: 'utf8' }],
      ['__fixtures__/tsconfigs/tsconfig.empty.json'],
      ['__fixtures__/tsconfigs/tsconfig.invalid.json', { encoding: 'utf8' }]
    ])('should return resolved tsconfig (%j)', async (
      id,
      options
    ) => {
      // Act
      let result = testSubject(id, { ...options, fs })
      if (isAsync) result = await result

      // Expect
      expect(result).to.satisfy(isResolvedTsconfig)
      expect(result).toMatchSnapshot()
    })
  })
})
