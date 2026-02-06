/**
 * @file Type Tests - Stat
 * @module tsconfig-utils/interfaces/tests/unit-d/Stat
 */

import type TestSubject from '#interfaces/stat'
import type * as mlly from '@flex-development/mlly'

describe('unit-d:interfaces/Stat', () => {
  it('should extend mlly.Stat', () => {
    expectTypeOf<TestSubject>().toExtend<mlly.Stat>()
  })
})
