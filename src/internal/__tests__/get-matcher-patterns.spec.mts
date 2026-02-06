/**
 * @file Unit Tests - getMatcherPatterns
 * @module tsconfig-utils/internal/tests/unit/getMatcherPatterns
 */

import type MatcherPatterns from '#interfaces/matcher-patterns'
import testSubject from '#internal/get-matcher-patterns'
import tsconfig from '#tsconfig' with { type: 'json' }
import { defaultExtensions } from '@flex-development/mlly'
import type { List } from '@flex-development/tsconfig-utils'
import tsconfigBuild from '../../../tsconfig.build.json' with { type: 'json' }

describe('unit:internal/getMatcherPatterns', () => {
  describe.each<[
    exclude: List<string> | null | undefined,
    include: List<string> | null | undefined,
    useCaseSensitiveFileNames?: boolean | null | undefined
  ]>([
    [null, null],
    [tsconfig.exclude, tsconfig.include],
    [tsconfigBuild.exclude, tsconfigBuild.include, true],
    [tsconfigBuild.exclude, ['src'], true]
  ])('%#', (
    exclude,
    include,
    useCaseSensitiveFileNames
  ) => {
    let result: MatcherPatterns

    beforeAll(() => {
      result = testSubject(
        defaultExtensions,
        exclude,
        include,
        useCaseSensitiveFileNames
      )
    })

    it('should return matchers pattern record', () => {
      expect(result).toMatchSnapshot()
    })

    describe('matchExtension', () => {
      it('should return `false` if `target` extension is not a match', () => {
        expect(result.matchExtension('grease.config.jsonc')).to.be.false
      })

      it('should return `true` if `target` extension is a match', () => {
        expect(result.matchExtension(import.meta.url)).to.be.true
      })
    })
  })
})
