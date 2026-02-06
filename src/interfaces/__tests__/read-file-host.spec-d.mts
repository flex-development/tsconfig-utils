/**
 * @file Type Tests - HostReadFile
 * @module tsconfig-utils/interfaces/tests/unit-d/HostReadFile
 */

import type TestSubject from '#interfaces/read-file-host'
import type { ModuleId } from '@flex-development/mlly'
import type { Awaitable } from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/HostReadFile', () => {
  it('should match [this: unknown]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [ModuleId]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[ModuleId]>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<string | undefined>', () => {
      expectTypeOf<TestSubject>()
        .returns
        .toEqualTypeOf<Awaitable<string | undefined>>()
    })
  })
})
