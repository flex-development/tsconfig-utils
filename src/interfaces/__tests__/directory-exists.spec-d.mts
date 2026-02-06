/**
 * @file Type Tests - DirectoryExists
 * @module tsconfig-utils/interfaces/tests/unit-d/DirectoryExists
 */

import type TestSubject from '#interfaces/directory-exists'
import type { ModuleId } from '@flex-development/mlly'
import type { Awaitable } from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/DirectoryExists', () => {
  it('should match [this: unknown]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [ModuleId]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[ModuleId]>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<boolean>', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Awaitable<boolean>>()
    })
  })
})
