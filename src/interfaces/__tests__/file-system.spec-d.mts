/**
 * @file Type Tests - FileSystem
 * @module tsconfig-utils/interfaces/tests/unit-d/FileSystem
 */

import type TestSubject from '#interfaces/file-system'
import type * as mlly from '@flex-development/mlly'
import type { Dirent } from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/FileSystem', () => {
  it('should extend mlly.FileSystem', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<mlly.FileSystem>()
  })

  describe('readdirSync', () => {
    type Subject = TestSubject['readdirSync']

    it('should match [this: void]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
    })

    describe('parameters', () => {
      it('should be callable with [mlly.ModuleId, { withFileTypes: true }]', () => {
        expectTypeOf<Subject>()
          .parameters
          .toEqualTypeOf<[mlly.ModuleId, { withFileTypes: true }]>()
      })
    })

    describe('returns', () => {
      it('should return readonly Dirent[]', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<readonly Dirent[]>()
      })
    })
  })
})
