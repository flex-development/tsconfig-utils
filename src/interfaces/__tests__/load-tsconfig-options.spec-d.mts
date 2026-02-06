/**
 * @file Type Tests - LoadTsconfigOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/LoadTsconfigOptions
 */

import type TestSubject from '#interfaces/load-tsconfig-options'
import type {
  List,
  ReadTsconfigOptions
} from '@flex-development/tsconfig-utils'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/LoadTsconfigOptions', () => {
  it('should extend ReadTsconfigOptions', () => {
    expectTypeOf<TestSubject>().toExtend<ReadTsconfigOptions>()
  })

  it('should match [relativePaths?: List<string> | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('relativePaths')
      .toEqualTypeOf<Nilable<List<string>>>()
  })
})
