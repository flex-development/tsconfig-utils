/**
 * @file Type Tests - ReadTsconfigOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/ReadTsconfigOptions
 */

import type TestSubject from '#interfaces/options-read-tsconfig'
import type {
  GetSourceOptions,
  MainField,
  ModuleId
} from '@flex-development/mlly'
import type { Condition } from '@flex-development/pkg-types'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/ReadTsconfigOptions', () => {
  it('should allow empty object', () => {
    assertType<TestSubject>({})
  })

  it('should extend GetSourceOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<GetSourceOptions>()
  })

  it('should match [conditions?: Condition[] | Set<Condition> | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('conditions')
      .toEqualTypeOf<Nilable<Condition[] | Set<Condition>>>()
  })

  it('should match [cwd?: ModuleId | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('cwd')
      .toEqualTypeOf<Nilable<ModuleId>>()
  })

  it('should match [mainFields?: MainField[] | Set<MainField> | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('mainFields')
      .toEqualTypeOf<Nilable<MainField[] | Set<MainField>>>()
  })

  it('should match [parent?: ModuleId | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('parent')
      .toEqualTypeOf<Nilable<ModuleId>>()
  })

  it('should match [preserveSymlinks?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('preserveSymlinks')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
