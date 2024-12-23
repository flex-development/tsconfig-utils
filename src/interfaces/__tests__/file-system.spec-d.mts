/**
 * @file Type Tests - FileSystem
 * @module tsconfig-utils/interfaces/tests/unit-d/FileSystem
 */

import type TestSubject from '#interfaces/file-system'
import type * as mlly from '@flex-development/mlly'

describe('unit-d:interfaces/FileSystem', () => {
  it('should extend mlly.FileSystem', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<mlly.FileSystem>()
  })

  describe('readFile', () => {
    type Subject = TestSubject['readFile']

    it('should match [this: void]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
    })

    describe('parameters', () => {
      it('should be callable with [mlly.ModuleId]', () => {
        expectTypeOf<Subject>().parameters.toEqualTypeOf<[mlly.ModuleId]>()
      })
    })

    describe('returns', () => {
      it('should return Buffer | string', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<Buffer | string>()
      })
    })
  })

  describe('readdir', () => {
    type Subject = TestSubject['readdir']

    it('should match [this: void]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
    })

    describe('parameters', () => {
      it('should be callable with [mlly.ModuleId]', () => {
        expectTypeOf<Subject>().parameters.toEqualTypeOf<[mlly.ModuleId]>()
      })
    })

    describe('returns', () => {
      it('should return string[]', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<string[]>()
      })
    })
  })

  describe('realpath', () => {
    type Subject = TestSubject['realpath']

    it('should match [this: void]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
    })

    describe('parameters', () => {
      it('should be callable with [mlly.ModuleId]', () => {
        expectTypeOf<Subject>().parameters.toEqualTypeOf<[mlly.ModuleId]>()
      })
    })

    describe('returns', () => {
      it('should return string', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<string>()
      })
    })
  })

  describe('stat', () => {
    type Subject = TestSubject['stat']

    it('should match [this: void]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
    })

    describe('parameters', () => {
      it('should be callable with [mlly.ModuleId]', () => {
        expectTypeOf<Subject>().parameters.toEqualTypeOf<[mlly.ModuleId]>()
      })
    })

    describe('returns', () => {
      it('should return mlly.Stats', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<mlly.Stats>()
      })
    })
  })
})
