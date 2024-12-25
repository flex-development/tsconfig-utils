/**
 * @file Type Tests - ModuleResolutionHostOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/ModuleResolutionHostOptions
 */

import type TestSubject from '#interfaces/options-module-resolution-host'
import type { ModuleId } from '@flex-development/mlly'
import type { FileSystem } from '@flex-development/tsconfig-utils'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/ModuleResolutionHostOptions', () => {
  it('should allow empty object', () => {
    assertType<TestSubject>({})
  })

  it('should match [fs?: FileSystem | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('fs')
      .toEqualTypeOf<Nilable<FileSystem>>()
  })

  it('should match [root?: ModuleId | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('root')
      .toEqualTypeOf<Nilable<ModuleId>>()
  })

  it('should match [useCaseSensitiveFileNames?: ((this: void) => boolean) | boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('root')
      .toEqualTypeOf<Nilable<ModuleId>>()
  })
})
