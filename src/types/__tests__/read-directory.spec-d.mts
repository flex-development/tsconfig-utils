/**
 * @file Type Tests - ReadDirectory
 * @module tsconfig-utils/types/tests/unit-d/ReadDirectory
 */

import type TestSubject from '#types/read-directory'
import type { ModuleId } from '@flex-development/mlly'
import type { EmptyArray } from '@flex-development/tutils'

describe('unit-d:types/ReadDirectory', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [ModuleId, Set<string> | readonly string[] | undefined, Set<string> | readonly string[] | undefined, Set<string> | readonly string[] | undefined, number | null | undefined]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[
        ModuleId,
        (Set<string> | readonly string[] | undefined)?,
        (Set<string> | readonly string[] | undefined)?,
        (Set<string> | readonly string[] | undefined)?,
        (number | null | undefined)?
      ]>()
    })
  })

  describe('returns', () => {
    it('should return T', () => {
      expectTypeOf<TestSubject<EmptyArray>>()
        .returns
        .toEqualTypeOf<EmptyArray>()
    })
  })
})
