/**
 * @file Type Tests - validateFunction
 * @module tsconfig-utils/internal/tests/unit-d/validateFunction
 */

import type { Fn } from '@flex-development/tutils'
import type testSubject from '../validate-function'

describe('unit-d:internal/validateFunction', () => {
  it('should guard Fn', () => {
    expectTypeOf<typeof testSubject>().guards.toEqualTypeOf<Fn>()
  })
})
