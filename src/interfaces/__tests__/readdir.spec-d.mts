/**
 * @file Type Tests - Readdir
 * @module tsconfig-utils/interfaces/tests/unit-d/Readdir
 */

import type TestSubject from '#interfaces/readdir'
import type { ModuleId } from '@flex-development/mlly'
import type {
  Awaitable,
  Dirent,
  ReaddirDirentOptions
} from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/Readdir', () => {
  it('should match [this: unknown]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [ModuleId, ReaddirDirentOptions]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[ModuleId, ReaddirDirentOptions]>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<readonly Dirent[]>', () => {
      expectTypeOf<TestSubject>()
        .returns
        .toEqualTypeOf<Awaitable<readonly Dirent[]>>()
    })
  })
})
