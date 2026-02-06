/**
 * @file Type Tests - Realpath
 * @module tsconfig-utils/interfaces/tests/unit-d/Realpath
 */

import type TestSubject from '#interfaces/realpath'
import type * as mlly from '@flex-development/mlly'

describe('unit-d:interfaces/Realpath', () => {
  it('should extend mlly.Realpath', () => {
    expectTypeOf<TestSubject>().toExtend<mlly.Realpath>()
  })
})
