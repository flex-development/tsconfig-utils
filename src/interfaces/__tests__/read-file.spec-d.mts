/**
 * @file Type Tests - ReadFile
 * @module tsconfig-utils/interfaces/tests/unit-d/ReadFile
 */

import type TestSubject from '#interfaces/read-file'
import type * as mlly from '@flex-development/mlly'

describe('unit-d:interfaces/ReadFile', () => {
  it('should extend mlly.ReadFile', () => {
    expectTypeOf<TestSubject>().toExtend<mlly.ReadFile>()
  })
})
