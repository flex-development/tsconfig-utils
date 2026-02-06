/**
 * @file Type Tests - ReadDirectory
 * @module tsconfig-utils/interfaces/tests/unit-d/ReadDirectory
 */

import type TestSubject from '#interfaces/read-directory'
import type { ModuleId } from '@flex-development/mlly'
import type { Awaitable, List } from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/ReadDirectory', () => {
  it('should match [this: unknown]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [ModuleId, (List<string> | null | undefined)?, (List<string> | null | undefined)?, (List<string> | null | undefined)?, (number | null | undefined)?]', () => {
      // Arrange
      type Expect = [
        ModuleId,
        (List<string> | null | undefined)?,
        (List<string> | null | undefined)?,
        (List<string> | null | undefined)?,
        (number | null | undefined)?
      ]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<Expect>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<readonly string[]>', () => {
      expectTypeOf<TestSubject>()
        .returns
        .toEqualTypeOf<Awaitable<readonly string[]>>()
    })
  })
})
