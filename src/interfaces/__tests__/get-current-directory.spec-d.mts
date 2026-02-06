/**
 * @file Type Tests - GetCurrentDirectory
 * @module tsconfig-utils/interfaces/tests/unit-d/GetCurrentDirectory
 */

import type TestSubject from '#interfaces/get-current-directory'
import type { Awaitable } from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/GetCurrentDirectory', () => {
  it('should match [this: unknown]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with []', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[]>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<string>', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Awaitable<string>>()
    })
  })
})
