/**
 * @file Type Tests - GetFileSystemEntries
 * @module tsconfig-utils/types/tests/unit-d/GetFileSystemEntries
 */

import type TestSubject from '#types/get-file-system-entries'
import type { ModuleId } from '@flex-development/mlly'
import type {
  Awaitable,
  FileSystem,
  FileSystemEntries
} from '@flex-development/tsconfig-utils'

describe('unit-d:types/GetFileSystemEntries', () => {
  it('should match [this: unknown]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [ModuleId, (FileSystem | null | undefined)?]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[ModuleId, (FileSystem | null | undefined)?]>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<FileSystemEntries>', () => {
      expectTypeOf<TestSubject>()
        .returns
        .toEqualTypeOf<Awaitable<FileSystemEntries>>()
    })
  })
})
