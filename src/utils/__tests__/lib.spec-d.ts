/**
 * @file Type Tests - LIB
 * @module tsconfig-utils/utils/tests/unit-d/LIB
 */

import type { Lib, LibFile } from '@flex-development/tsconfig-types'
import type TEST_SUBJECT from '../lib'

describe('unit-d:utils/LIB', () => {
  it('should equal type of Map<Lowercase<Lib>, LibFile>', () => {
    // Arrange
    type Expected = Map<Lowercase<Lib>, LibFile>

    // Expect
    expectTypeOf<typeof TEST_SUBJECT>().toEqualTypeOf<Expected>()
  })
})
