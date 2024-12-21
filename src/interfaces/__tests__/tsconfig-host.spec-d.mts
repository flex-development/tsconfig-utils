/**
 * @file Type Tests - TsconfigHost
 * @module tsconfig-utils/interfaces/tests/unit-d/TsconfigHost
 */

import type TestSubject from '#interfaces/tsconfig-host'
import type { Tsconfig } from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/TsconfigHost', () => {
  it('should match [tsconfig: Tsconfig]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tsconfig')
      .toEqualTypeOf<Tsconfig>()
  })
})
