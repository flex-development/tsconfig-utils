/**
 * @file Type Tests - UseCaseSensitiveFileNames
 * @module tsconfig-utils/types/tests/unit-d/UseCaseSensitiveFileNames
 */

import type TestSubject from '#types/use-case-sensitive-file-names'
import type {
  UseCaseSensitiveFileNamesFn
} from '@flex-development/tsconfig-utils'

describe('unit-d:types/UseCaseSensitiveFileNames', () => {
  it('should extract UseCaseSensitiveFileNamesFn', () => {
    expectTypeOf<TestSubject>()
      .extract<UseCaseSensitiveFileNamesFn>()
      .not.toBeNever()
  })

  it('should extract boolean', () => {
    expectTypeOf<TestSubject>().extract<boolean>().not.toBeNever()
  })

  it('should extract null', () => {
    expectTypeOf<TestSubject>().extract<null>().not.toBeNever()
  })

  it('should extract undefined', () => {
    expectTypeOf<TestSubject>().extract<undefined>().not.toBeNever()
  })
})
