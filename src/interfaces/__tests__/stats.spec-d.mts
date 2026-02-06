/**
 * @file Type Tests - Stats
 * @module tsconfig-utils/interfaces/tests/unit-d/Stats
 */

import type TestSubject from '#interfaces/stats'
import type * as mlly from '@flex-development/mlly'
import type { IsDirectory, IsFile } from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/Stats', () => {
  it('should extend mlly.Stats', () => {
    expectTypeOf<TestSubject>().toExtend<mlly.Stats>()
  })

  it('should match [isDirectory: IsDirectory]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('isDirectory')
      .toEqualTypeOf<IsDirectory>()
  })

  it('should match [isFile: IsFile]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('isFile')
      .toEqualTypeOf<IsFile>()
  })
})
