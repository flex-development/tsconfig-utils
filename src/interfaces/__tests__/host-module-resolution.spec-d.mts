/**
 * @file Type Tests - ModuleResolutionHost
 * @module tsconfig-utils/interfaces/tests/unit-d/ModuleResolutionHost
 */

import type TestSubject from '#interfaces/host-module-resolution'
import type { ModuleId } from '@flex-development/mlly'
import type ts from 'typescript'

describe('unit-d:interfaces/ModuleResolutionHost', () => {
  it('should match ts.ModuleResolutionHost', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<ts.ModuleResolutionHost>()
  })

  describe('directoryExists', () => {
    type Subject = TestSubject['directoryExists']

    it('should match [this: void]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
    })

    describe('parameters', () => {
      it('should be callable with [ModuleId]', () => {
        expectTypeOf<Subject>().parameters.toEqualTypeOf<[ModuleId]>()
      })
    })

    describe('returns', () => {
      it('should return boolean', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<boolean>()
      })
    })
  })

  describe('fileExists', () => {
    type Subject = TestSubject['fileExists']

    it('should match [this: void]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
    })

    describe('parameters', () => {
      it('should be callable with [ModuleId]', () => {
        expectTypeOf<Subject>().parameters.toEqualTypeOf<[ModuleId]>()
      })
    })

    describe('returns', () => {
      it('should return boolean', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<boolean>()
      })
    })
  })

  describe('getDirectories', () => {
    type Subject = TestSubject['getDirectories']

    it('should match [this: void]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
    })

    describe('parameters', () => {
      it('should be callable with [ModuleId]', () => {
        expectTypeOf<Subject>().parameters.toEqualTypeOf<[ModuleId]>()
      })
    })

    describe('returns', () => {
      it('should return string[]', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<string[]>()
      })
    })
  })

  describe('readFile', () => {
    type Subject = TestSubject['readFile']

    it('should match [this: void]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
    })

    describe('parameters', () => {
      it('should be callable with [ModuleId]', () => {
        expectTypeOf<Subject>().parameters.toEqualTypeOf<[ModuleId]>()
      })
    })

    describe('returns', () => {
      it('should return string | undefined', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<string | undefined>()
      })
    })
  })

  describe('realpath', () => {
    type Subject = TestSubject['realpath']

    it('should match [this: void]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
    })

    describe('parameters', () => {
      it('should be callable with [ModuleId]', () => {
        expectTypeOf<Subject>().parameters.toEqualTypeOf<[ModuleId]>()
      })
    })

    describe('returns', () => {
      it('should return string', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<string>()
      })
    })
  })
})
