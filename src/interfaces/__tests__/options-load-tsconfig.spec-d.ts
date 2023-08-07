/**
 * @file Type Tests - LoadTsconfigOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/LoadTsconfigOptions
 */

import type mlly from '@flex-development/mlly'
import type { Fn, Optional, RequiredKeys } from '@flex-development/tutils'
import type TestSubject from '../options-load-tsconfig'

describe('unit-d:interfaces/LoadTsconfigOptions', () => {
  it('should allow empty object', () => {
    expectTypeOf<RequiredKeys<TestSubject>>().toBeNever()
  })

  it('should match [file?: Optional<Fn<[mlly.ModuleId], boolean>>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('file')
      .toEqualTypeOf<Optional<Fn<[mlly.ModuleId], boolean>>>()
  })

  it('should match [read?: Optional<Fn<[mlly.ModuleId], string>>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('read')
      .toEqualTypeOf<Optional<Fn<[mlly.ModuleId], string>>>()
  })
})
