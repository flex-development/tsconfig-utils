/**
 * @file Type Tests - ReaddirOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/ReaddirOptions
 */

import type TestSubject from '#interfaces/readdir-options'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/ReaddirOptions', () => {
  it('should match [withFileTypes?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('withFileTypes')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
