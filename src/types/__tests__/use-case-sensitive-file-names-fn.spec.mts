/**
 * @file Type Tests - UseCaseSensitiveFileNamesFn
 * @module tsconfig-utils/types/tests/unit-d/UseCaseSensitiveFileNamesFn
 */

import type TestSubject from '#types/use-case-sensitive-file-names-fn'
import type { EmptyArray } from '@flex-development/mlly'

describe('unit-d:types/UseCaseSensitiveFileNamesFn', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with []', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<EmptyArray>()
    })
  })

  describe('returns', () => {
    it('should return boolean | null | undefined', () => {
      expectTypeOf<TestSubject>()
        .returns
        .toEqualTypeOf<boolean | null | undefined>()
    })
  })
})
