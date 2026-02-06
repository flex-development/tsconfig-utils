/**
 * @file Type Tests - FileSystem
 * @module tsconfig-utils/interfaces/tests/unit-d/FileSystem
 */

import type TestSubject from '#interfaces/file-system'
import type * as mlly from '@flex-development/mlly'
import type {
  ReadFile,
  Readdir,
  Realpath,
  Stat
} from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/FileSystem', () => {
  it('should extend mlly.FileSystem', () => {
    expectTypeOf<TestSubject>().toExtend<mlly.FileSystem>()
  })

  it('should match [readFile: ReadFile]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('readFile')
      .toEqualTypeOf<ReadFile>()
  })

  it('should match [readdir: Readdir]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('readdir')
      .toEqualTypeOf<Readdir>()
  })

  it('should match [realpath: Realpath]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('realpath')
      .toEqualTypeOf<Realpath>()
  })

  it('should match [stat: Stat]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('stat').toEqualTypeOf<Stat>()
  })
})
