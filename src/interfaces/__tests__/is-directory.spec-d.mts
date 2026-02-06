/**
 * @file Type Tests - IsDirectory
 * @module tsconfig-utils/interfaces/tests/unit-d/IsDirectory
 */

import type TestSubject from '#interfaces/is-directory'
import type * as mlly from '@flex-development/mlly'

describe('unit-d:interfaces/IsDirectory', () => {
  it('should extend mlly.IsDirectory', () => {
    expectTypeOf<TestSubject>().toExtend<mlly.IsDirectory>()
  })
})
