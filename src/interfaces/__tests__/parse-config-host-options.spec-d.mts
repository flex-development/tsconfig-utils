/**
 * @file Type Tests - ParseConfigHostOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/ParseConfigHostOptions
 */

import type TestSubject from '#interfaces/parse-config-host-options'
import type {
  ModuleResolutionHostOptions
} from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/ParseConfigHostOptions', () => {
  it('should extend ModuleResolutionHostOptions', () => {
    expectTypeOf<TestSubject>().toExtend<ModuleResolutionHostOptions>()
  })
})
