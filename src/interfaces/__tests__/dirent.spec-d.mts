/**
 * @file Type Tests - Dirent
 * @module tsconfig-utils/interfaces/tests/unit-d/Dirent
 */

import type TestSubject from '#interfaces/dirent'
import type * as fst from '@flex-development/fst-util-from-fs'

describe('unit-d:interfaces/Dirent', () => {
  it('should extend fst.Dirent', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<fst.Dirent>()
  })

  it('should match [parentPath: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('parentPath')
      .toEqualTypeOf<string>()
  })
})
