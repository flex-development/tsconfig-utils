/**
 * @file Type Tests - List
 * @module tsconfig-utils/types/tests/unit-d/List
 */

import type TestSubject from '#types/list'
import type { ModuleFormat } from '@flex-development/mlly'

describe('unit-d:types/List', () => {
  type Subject = TestSubject<ModuleFormat>

  it('should allow Set<T>', () => {
    expectTypeOf<Set<ModuleFormat>>().toExtend<Subject>()
  })

  it('should allow T[]', () => {
    expectTypeOf<ModuleFormat[]>().toExtend<Subject>()
  })

  it('should extract ReadonlySet<T>', () => {
    expectTypeOf<Subject>().extract<ReadonlySet<ModuleFormat>>().not.toBeNever()
  })

  it('should extract readonly T[]', () => {
    expectTypeOf<Subject>().extract<readonly ModuleFormat[]>().not.toBeNever()
  })
})
