/**
 * @file Type Tests - ReaddirDirentOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/ReaddirDirentOptions
 */

import type TestSubject from '#interfaces/readdir-dirent-options'
import type { ReaddirOptions } from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/ReaddirDirentOptions', () => {
  it('should extend ReaddirOptions', () => {
    expectTypeOf<TestSubject>().toExtend<ReaddirOptions>()
  })

  it('should match [withFileTypes: true]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('withFileTypes')
      .toEqualTypeOf<true>()
  })
})
