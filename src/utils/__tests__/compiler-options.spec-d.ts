/**
 * @file Type Tests - COMPILER_OPTIONS
 * @module tsconfig-utils/utils/tests/unit-d/COMPILER_OPTIONS
 */

import type { CompilerOption } from '@flex-development/tsconfig-types'
import type TEST_SUBJECT from '../compiler-options'

describe('unit-d:utils/COMPILER_OPTIONS', () => {
  it('should be instance of Set<CompilerOption>', () => {
    expectTypeOf<typeof TEST_SUBJECT>().toEqualTypeOf<Set<CompilerOption>>()
  })
})
