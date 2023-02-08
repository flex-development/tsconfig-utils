/**
 * @file Type Tests - ResolvePathsOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/ResolvePathsOptions
 */

import type mlly from '@flex-development/mlly'
import type LoadTsconfigOptions from '../options-load-tsconfig'
import type TestSubject from '../options-resolve-paths'

describe('unit-d:interfaces/ResolvePathsOptions', () => {
  it('should extend LoadTsconfigOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<LoadTsconfigOptions>()
  })

  it('should extend Omit<mlly.ResolveAliasOptions, "aliases" | "cwd">', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<
      Omit<mlly.ResolveAliasOptions, 'aliases' | 'cwd'>
    >()
  })

  it('should match [baseUrl?: mlly.ResolveAliasOptions["cwd"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('baseUrl')
      .toEqualTypeOf<mlly.ResolveAliasOptions['cwd']>()
  })

  it('should match [parent: mlly.ModuleId]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('parent')
      .toEqualTypeOf<mlly.ModuleId>()
  })

  it('should match [tsconfig?: mlly.ModuleId]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tsconfig')
      .toEqualTypeOf<mlly.ModuleId | undefined>()
  })
})
