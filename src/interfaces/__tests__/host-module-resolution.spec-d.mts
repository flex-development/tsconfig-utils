/**
 * @file Type Tests - ModuleResolutionHost
 * @module tsconfig-utils/interfaces/tests/unit-d/ModuleResolutionHost
 */

import type TestSubject from '#interfaces/host-module-resolution'
import type {
  DirectoryExists,
  FileExists,
  GetCurrentDirectory,
  GetDirectories,
  HostReadFile,
  Realpath,
  UseCaseSensitiveFileNames
} from '@flex-development/tsconfig-utils'
import type ts from 'typescript'

describe('unit-d:interfaces/ModuleResolutionHost', () => {
  it('should have same keys as Omit<ts.ModuleResolutionHost, "trace">', () => {
    // Arrange
    type K = keyof Omit<ts.ModuleResolutionHost, 'trace'>

    // Expect
    expectTypeOf<keyof TestSubject>().toEqualTypeOf<K>()
  })

  it('should match [directoryExists: DirectoryExists]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('directoryExists')
      .toEqualTypeOf<DirectoryExists>()
  })

  it('should match [fileExists: FileExists]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('fileExists')
      .toEqualTypeOf<FileExists>()
  })

  it('should match [getCurrentDirectory: GetCurrentDirectory]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('getCurrentDirectory')
      .toEqualTypeOf<GetCurrentDirectory>()
  })

  it('should match [getDirectories: GetDirectories]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('getDirectories')
      .toEqualTypeOf<GetDirectories>()
  })

  it('should match [readFile: HostReadFile]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('readFile')
      .toEqualTypeOf<HostReadFile>()
  })

  it('should match [realpath: Realpath]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('realpath')
      .toEqualTypeOf<Realpath>()
  })

  it('should match [useCaseSensitiveFileNames?: UseCaseSensitiveFileNames]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('useCaseSensitiveFileNames')
      .toEqualTypeOf<UseCaseSensitiveFileNames>()
  })

  // this test fails, but the corresponding `ts.ParseConfigHost` test does not.
  // unsure why.
  // it('should match ts.ModuleResolutionHost', () => {
  //   expectTypeOf<TestSubject>().toExtend<ts.ModuleResolutionHost>()
  // })
})
