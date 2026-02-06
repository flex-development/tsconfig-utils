/**
 * @file Type Tests - ResolvePathOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/ResolvePathOptions
 */

import type TestSubject from '#interfaces/resolve-path-options'
import type { ResolveAliasOptions } from '@flex-development/mlly'
import type {
  ResolvedTsconfig,
  Tsconfig
} from '@flex-development/tsconfig-utils'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/ResolvePathOptions', () => {
  it('should extend ResolveAliasOptions', () => {
    expectTypeOf<TestSubject>().toExtend<ResolveAliasOptions>()
  })

  it('should match [aliases?: null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('aliases')
      .toEqualTypeOf<Nilable<never>>()
  })

  it('should match [tsconfig?: ResolvedTsconfig | Tsconfig | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tsconfig')
      .toEqualTypeOf<Nilable<ResolvedTsconfig | Tsconfig>>()
  })
})
