/**
 * @file Type Tests - ParseConfigHost
 * @module tsconfig-utils/interfaces/tests/unit-d/ParseConfigHost
 */

import type TestSubject from '#interfaces/host-parse-config'
import type { ModuleId } from '@flex-development/mlly'
import type { ModuleResolutionHost } from '@flex-development/tsconfig-utils'
import type ts from 'typescript'

describe('unit-d:interfaces/ParseConfigHost', () => {
  it('should extend ModuleResolutionHost', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<ModuleResolutionHost>()
  })

  it('should match [useCaseSensitiveFileNames: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('useCaseSensitiveFileNames')
      .toEqualTypeOf<boolean>
  })

  it('should match Required<Omit<ts.ParseConfigHost, "trace">>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<Required<Omit<ts.ParseConfigHost, 'trace'>>>()
  })

  describe('readDirectory', () => {
    type Subject = TestSubject['readDirectory']

    it('should match [this: void]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
    })

    describe('parameters', () => {
      it('should be callable with [ModuleId, Set<string> | readonly string[] | undefined, Set<string> | readonly string[] | undefined, Set<string> | readonly string[] | undefined, number | null | undefined]', () => {
        expectTypeOf<Subject>().parameters.toEqualTypeOf<[
          ModuleId,
          (Set<string> | readonly string[] | undefined)?,
          (Set<string> | readonly string[] | undefined)?,
          (Set<string> | readonly string[] | undefined)?,
          (number | null | undefined)?
        ]>()
      })
    })

    describe('returns', () => {
      it('should return readonly string[]', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<readonly string[]>()
      })
    })
  })
})
