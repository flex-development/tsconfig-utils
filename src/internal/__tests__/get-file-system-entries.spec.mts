/**
 * @file Unit Tests - getFileSystemEntries
 * @module tsconfig-utils/internal/tests/unit/getFileSystemEntries
 */

import fixtureContent from '#fixtures/fs/content'
import directories from '#fixtures/fs/directories'
import files from '#fixtures/fs/files'
import fsa from '#fixtures/fs/fsa'
import constant from '#internal/constant'
import emptyFileSystemEntries from '#internal/empty-file-system-entries'
import dfs from '#internal/fs'
import testSubject from '#internal/get-file-system-entries'
import isPromise from '#internal/is-promise'
import fsCaseType, { type FileSystemCaseType } from '#tests/utils/fs-case-type'
import { cwd } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type {
  Awaitable,
  Dirent,
  FileSystem,
  Readdir,
  ReaddirDirentOptions
} from '@flex-development/tsconfig-utils'
import { ok } from 'devlop'
import type { MockedFunction } from 'vitest'

describe('unit:internal/getFileSystemEntries', () => {
  describe.each<[fst: FileSystemCaseType, fs: FileSystem]>([
    [fsCaseType.default, dfs],
    [fsCaseType.onlyAsync, fsa]
  ])('fs (%s)', (fsType, fs) => {
    type Case = Parameters<typeof testSubject>

    let badContent: Dirent[]
    let content: Dirent[]
    let isAsync: boolean
    let readOptions: ReaddirDirentOptions
    let readdir: MockedFunction<Readdir>

    beforeAll(() => {
      isAsync = fs === fsa
      readOptions = { withFileTypes: true }

      content = [...fixtureContent, {
        isDirectory: constant(false),
        isFile: constant(false),
        isSymbolicLink: constant(false),
        name: '.nvmrc',
        parentPath: pathe.cwd()
      }]

      badContent = [...fixtureContent, {
        isDirectory: constant(false),
        isFile: constant(true),
        isSymbolicLink: constant(true),
        name: 'index.mts',
        parentPath: pathe.cwd()
      }]
    })

    beforeEach(() => {
      readdir = vi.spyOn(fs, 'readdir')
    })

    it.each<Case>([
      [null],
      [pathe.cwd()]
    ])('should return empty record on error (%#)', async parent => {
      // Setup
      readdir.mockImplementationOnce((): Awaitable<Dirent[]> => {
        if (parent) {
          if (!isAsync) throw new Error()
          return new Promise((resolve, reject) => reject(new Error()))
        }

        if (isAsync) return new Promise(resolve => resolve(badContent))
        return badContent
      })

      // Arrange
      const path: string = parent ? pathe.toPath(parent) : pathe.dot

      // Act
      let result = testSubject(parent, fs)

      // Expect (promises)
      if (isAsync) {
        expect(result).to.satisfy(isPromise), result = await result
      } else {
        expect(result).to.not.satisfy(isPromise)
      }

      // Expect (other checks)
      expect(readdir).toHaveBeenCalledTimes(1)
      expect(readdir.mock.lastCall![0]).to.eq(path)
      expect(readdir.mock.lastCall![1]).to.eql(readOptions)
      expect(result).to.eq(emptyFileSystemEntries)
    })

    it.each<Case>([
      [null],
      [cwd()],
      [pathe.cwd()]
    ])('should return file system entries record (%#)', async parent => {
      // Setup
      readdir.mockImplementationOnce((): Awaitable<Dirent[]> => {
        return isAsync ? new Promise(resolve => resolve(content)) : content
      })

      // Arrange
      const path: string = parent ? pathe.toPath(parent) : pathe.dot

      // Act
      let result = testSubject(parent, fs)

      // Expect (promises)
      if (isAsync) {
        expect(result).to.satisfy(isPromise), result = await result
      } else {
        expect(result).to.not.satisfy(isPromise)
      }

      ok(!isPromise(result), 'expected file system entries record')

      // Expect (other checks)
      expect(readdir).toHaveBeenCalledTimes(1)
      expect(readdir.mock.lastCall![0]).to.eq(path)
      expect(readdir.mock.lastCall![1]).to.eql(readOptions)
      expect(result).to.have.keys(['directories', 'files'])
      expect(new Set(result.directories)).to.eql(new Set(directories))
      expect(new Set(result.files)).to.eql(new Set(files))
    })
  })
})
