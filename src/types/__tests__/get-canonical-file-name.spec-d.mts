/**
 * @file Type Tests - GetCanonicalFileName
 * @module tsconfig-utils/types/tests/unit-d/GetCanonicalFileName
 */

import type TestSubject from '#types/get-canonical-file-name'
import type { ModuleId } from '@flex-development/mlly'

describe('unit-d:types/GetCanonicalFileName', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [ModuleId]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[ModuleId]>()
    })
  })

  describe('returns', () => {
    it('should return string', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<string>()
    })
  })
})
