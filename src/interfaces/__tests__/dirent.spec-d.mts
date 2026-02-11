/**
 * @file Type Tests - Dirent
 * @module tsconfig-utils/interfaces/tests/unit-d/Dirent
 */

import type TestSubject from '#interfaces/dirent'
import type {
  IsDirectory,
  IsFile,
  IsSymbolicLink
} from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/Dirent', () => {
  it('should match [isDirectory: IsDirectory]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('isDirectory')
      .toEqualTypeOf<IsDirectory>()
  })

  it('should match [isFile: IsFile]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('isFile').toEqualTypeOf<IsFile>()
  })

  it('should match [isSymbolicLink: IsSymbolicLink]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('isSymbolicLink')
      .toEqualTypeOf<IsSymbolicLink>()
  })

  it('should match [name: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('name').toEqualTypeOf<string>()
  })
})
