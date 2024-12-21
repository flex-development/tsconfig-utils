/**
 * @file Type Tests - FileSystem
 * @module tsconfig-utils/interfaces/tests/unit-d/FileSystem
 */

import type TestSubject from '#interfaces/file-system'
import type * as mlly from '@flex-development/mlly'

describe('unit-d:interfaces/FileSystem', () => {
  it('should extend mlly.FileSystem', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<mlly.FileSystem>()
  })
})
