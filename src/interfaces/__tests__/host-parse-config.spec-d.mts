/**
 * @file Type Tests - ParseConfigHost
 * @module tsconfig-utils/interfaces/tests/unit-d/ParseConfigHost
 */

import type TestSubject from '#interfaces/host-parse-config'
import type {
  ModuleResolutionHost,
  ReadDirectory
} from '@flex-development/tsconfig-utils'
import type ts from 'typescript'

describe('unit-d:interfaces/ParseConfigHost', () => {
  it('should extend ModuleResolutionHost', () => {
    expectTypeOf<TestSubject>().toExtend<ModuleResolutionHost>()
  })

  it('should match [readDirectory: ReadDirectory]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('readDirectory')
      .toEqualTypeOf<ReadDirectory>
  })

  it('should match [useCaseSensitiveFileNames: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('useCaseSensitiveFileNames')
      .toEqualTypeOf<boolean>
  })

  it('should match ts.ParseConfigHost', () => {
    expectTypeOf<TestSubject>().toExtend<ts.ParseConfigHost>()
  })
})
