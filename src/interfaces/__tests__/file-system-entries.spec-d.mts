/**
 * @file Type Tests - FileSystemEntries
 * @module tsconfig-utils/interfaces/tests/unit-d/FileSystemEntries
 */

import type TestSubject from '#interfaces/file-system-entries'
import type { ReadonlyKeys } from '@flex-development/tutils'

describe('unit-d:interfaces/FileSystemEntries', () => {
  type List = readonly string[]
  type RK = ReadonlyKeys<TestSubject>

  it('should match [readonly directories: readonly string[]]', () => {
    expectTypeOf<RK>().extract<'directories'>().not.toBeNever()
    expectTypeOf<TestSubject>()
      .toHaveProperty('directories')
      .toEqualTypeOf<List>()
  })

  it('should match [readonly files: readonly string[]]', () => {
    expectTypeOf<RK>().extract<'files'>().not.toBeNever()
    expectTypeOf<TestSubject>().toHaveProperty('files').toEqualTypeOf<List>()
  })
})
