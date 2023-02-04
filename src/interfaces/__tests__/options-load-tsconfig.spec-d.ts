/**
 * @file Type Tests - LoadTsconfigOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/LoadTsconfigOptions
 */

import type { Fn, KeysRequired } from '@flex-development/tutils'
import type { URL } from 'node:url'
import type TestSubject from '../options-load-tsconfig'

describe('unit-d:interfaces/LoadTsconfigOptions', () => {
  it('should allow empty object', () => {
    expectTypeOf<KeysRequired<TestSubject>>().toBeNever()
  })

  it('should match [file?: Fn<[URL | string], boolean>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('file')
      .toEqualTypeOf<Fn<[URL | string], boolean> | undefined>()
  })

  it('should match [read?: Fn<[URL | string], string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('read')
      .toEqualTypeOf<Fn<[URL | string], string> | undefined>()
  })
})
