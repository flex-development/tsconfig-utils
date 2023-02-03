/**
 * @file Type Tests - validateString
 * @module tsconfig-utils/internal/tests/unit-d/validateString
 */

import type testSubject from '../validate-string'

describe('unit-d:internal/validateString', () => {
  it('should guard string', () => {
    expectTypeOf<typeof testSubject>().guards.toBeString()
  })
})
