/**
 * @file Type Tests - GetDirectories
 * @module tsconfig-utils/interfaces/tests/unit-d/GetDirectories
 */

import type TestSubject from '#interfaces/get-directories'
import type { ModuleId } from '@flex-development/mlly'
import type { Awaitable } from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/GetDirectories', () => {
  it('should match [this: unknown]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [ModuleId]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[ModuleId]>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<string[]>', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Awaitable<string[]>>()
    })
  })
})
