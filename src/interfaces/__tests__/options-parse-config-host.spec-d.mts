/**
 * @file Type Tests - ParseConfigHostOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/ParseConfigHostOptions
 */

import type TestSubject from '#interfaces/options-parse-config-host'
import type {
  ModuleResolutionHostOptions
} from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/ParseConfigHostOptions', () => {
  it('should allow empty object', () => {
    assertType<TestSubject>({})
  })

  it('should extend ModuleResolutionHostOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<ModuleResolutionHostOptions>()
  })
})
