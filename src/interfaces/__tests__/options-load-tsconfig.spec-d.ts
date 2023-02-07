/**
 * @file Type Tests - LoadTsconfigOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/LoadTsconfigOptions
 */

import type mlly from '@flex-development/mlly'
import type { Fn, KeysRequired } from '@flex-development/tutils'
import type TestSubject from '../options-load-tsconfig'

describe('unit-d:interfaces/LoadTsconfigOptions', () => {
  it('should allow empty object', () => {
    expectTypeOf<KeysRequired<TestSubject>>().toBeNever()
  })

  it('should match [file?: Fn<[mlly.ModuleId], boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('file')
      .toEqualTypeOf<Fn<[mlly.ModuleId], boolean> | undefined>()
  })

  it('should match [read?: Fn<[mlly.ModuleId], string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('read')
      .toEqualTypeOf<Fn<[mlly.ModuleId], string> | undefined>()
  })
})
