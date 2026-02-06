/**
 * @file Type Tests - ReadTsconfigOptions
 * @module tsconfig-utils/interfaces/tests/unit-d/ReadTsconfigOptions
 */

import type TestSubject from '#interfaces/read-tsconfig-options'
import type {
  Condition,
  GetSourceOptions,
  MainField,
  ModuleId
} from '@flex-development/mlly'
import type { List } from '@flex-development/tsconfig-utils'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/ReadTsconfigOptions', () => {
  it('should extend GetSourceOptions', () => {
    expectTypeOf<TestSubject>().toExtend<GetSourceOptions>()
  })

  it('should match [conditions?: List<Condition> | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('conditions')
      .toEqualTypeOf<Nilable<List<Condition>>>()
  })

  it('should match [cwd?: ModuleId | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('cwd')
      .toEqualTypeOf<Nilable<ModuleId>>()
  })

  it('should match [mainFields?: MainField[] | Set<MainField> | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('mainFields')
      .toEqualTypeOf<Nilable<List<MainField>>>()
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
