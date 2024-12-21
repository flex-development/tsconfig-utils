/**
 * @file Type Tests - LoadTsconfigOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/LoadTsconfigOptions
 */

import type TestSubject from '#interfaces/options-load-tsconfig'
import type { ReadTsconfigOptions } from '@flex-development/tsconfig-utils'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/LoadTsconfigOptions', () => {
  it('should allow empty object', () => {
    assertType<TestSubject>({})
  })

  it('should extend ReadTsconfigOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<ReadTsconfigOptions>()
  })

  it('should match [relativePaths?: Set<string> | readonly string[] | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('relativePaths')
      .toEqualTypeOf<Nilable<Set<string> | readonly string[]>>()
  })
})
