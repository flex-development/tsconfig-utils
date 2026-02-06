/**
 * @file Type Tests - MatcherPatterns
 * @module tsconfig-utils/interfaces/tests/unit-d/MatcherPatterns
 */

import type TestSubject from '#interfaces/matcher-patterns'
import type { ModuleId } from '@flex-development/mlly'

describe('unit-d:interfaces/MatcherPatterns', () => {
  type List = Set<string>

  it('should match [directoryInclude: Set<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('directoryInclude')
      .toEqualTypeOf<List>()
  })

  it('should match [exclude: Set<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('exclude')
      .toEqualTypeOf<List>()
  })

  it('should match [fileInclude: Set<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('fileInclude')
      .toEqualTypeOf<List>()
  })

  it('should match [useCaseSensitiveFileNames: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('useCaseSensitiveFileNames')
      .toEqualTypeOf<boolean>()
  })

  describe('matchExtension', () => {
    type Subject = TestSubject['matchExtension']

    it('should match [this: MatcherPatterns]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<TestSubject>()
    })

    describe('parameters', () => {
      it('should be callable with [ModuleId]', () => {
        expectTypeOf<Subject>().parameters.toEqualTypeOf<[ModuleId]>()
      })
    })

    describe('returns', () => {
      it('should return boolean', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<boolean>()
      })
    })
  })
})
