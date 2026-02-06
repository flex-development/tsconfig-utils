/**
 * @file Type Tests - IsFile
 * @module tsconfig-utils/interfaces/tests/unit-d/IsFile
 */

import type TestSubject from '#interfaces/is-file'
import type * as mlly from '@flex-development/mlly'

describe('unit-d:interfaces/IsFile', () => {
  it('should extend mlly.IsFile', () => {
    expectTypeOf<TestSubject>().toExtend<mlly.IsFile>()
  })
})
