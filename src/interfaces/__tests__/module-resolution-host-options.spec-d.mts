/**
 * @file Type Tests - ModuleResolutionHostOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/ModuleResolutionHostOptions
 */

import type TestSubject from '#interfaces/module-resolution-host-options'
import type { BufferEncoding, ModuleId } from '@flex-development/mlly'
import type {
  FileSystem,
  UseCaseSensitiveFileNames
} from '@flex-development/tsconfig-utils'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/ModuleResolutionHostOptions', () => {
  it('should match [encoding?: BufferEncoding | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('encoding')
      .toEqualTypeOf<Nilable<BufferEncoding>>()
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

  it('should match [useCaseSensitiveFileNames?: UseCaseSensitiveFileNames]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('useCaseSensitiveFileNames')
      .toEqualTypeOf<Nilable<UseCaseSensitiveFileNames>>()
  })
})
