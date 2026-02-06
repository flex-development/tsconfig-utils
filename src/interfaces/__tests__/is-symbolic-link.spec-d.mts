/**
 * @file Type Tests - IsSymbolicLink
 * @module tsconfig-utils/interfaces/tests/unit-d/IsSymbolicLink
 */

import type TestSubject from '#interfaces/is-symbolic-link'

describe('unit-d:interfaces/IsSymbolicLink', () => {
  it('should match [this: unknown]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with []', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[]>()
    })
  })

  describe('returns', () => {
    it('should return boolean', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<boolean>()
    })
  })
})
