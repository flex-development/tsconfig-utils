/**
 * @file Unit Tests - createModuleResolutionHost
 * @module tsconfig-utils/lib/tests/unit/createModuleResolutionHost
 */

import content from '#fixtures/fs/content'
import fsa from '#fixtures/fs/fsa'
import dfs from '#internal/fs'
import isPromise from '#internal/is-promise'
import withTrailingSlash from '#internal/with-trailing-slash'
import testSubject from '#lib/create-module-resolution-host'
import fsCaseType, { type FileSystemCaseType } from '#tests/utils/fs-case-type'
import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type {
  Awaitable,
  Dirent,
  FileSystem,
  ModuleResolutionHost
} from '@flex-development/tsconfig-utils'

describe('unit:lib/createModuleResolutionHost', () => {
  it.each<Parameters<typeof testSubject>>([
    [],
    [
      {
        // eslint-disable-next-line unicorn/text-encoding-identifier-case
        encoding: 'utf-8',
        useCaseSensitiveFileNames: true
      }
    ],
    [
      {
        useCaseSensitiveFileNames: vi.fn().mockName('useCaseSensitiveFileNames')
      }
    ]
  ])('should create module resolution host (%#)', options => {
    expect(testSubject(options)).toMatchSnapshot()
  })

  describe.each<[fst: FileSystemCaseType, fs: FileSystem]>([
    [fsCaseType.default, dfs],
    [fsCaseType.onlyAsync, fsa]
  ])('fs (%s)', (fsType, fs) => {
    let isAsync: boolean

    beforeAll(() => {
      isAsync = fs === fsa
    })

    describe('directoryExists', () => {
      let subject: ModuleResolutionHost

      beforeAll(() => {
        subject = testSubject({ fs })
      })

      it('should return `false` if no directory at `id`', async () => {
        // Act
        let result = subject.directoryExists(pathe.pathToFileURL('source'))

        // Expect (promises)
        if (isAsync) {
          expect(result).to.satisfy(isPromise), result = await result
        } else {
          expect(result).to.not.satisfy(isPromise)
        }

        // Expect (result)
        expect(result).to.be.false
      })

      it('should return `true` if directory at `id`', async () => {
        // Act
        let result = subject.directoryExists('src')

        // Expect (promises)
        if (isAsync) {
          expect(result).to.satisfy(isPromise), result = await result
        } else {
          expect(result).to.not.satisfy(isPromise)
        }

        // Expect (result)
        expect(result).to.be.true
      })
    })

    describe('fileExists', () => {
      let subject: ModuleResolutionHost

      beforeAll(() => {
        subject = testSubject({ fs })
      })

      it('should return `false` if no file at `id`', async () => {
        // Act
        let result = subject.fileExists('index.mjs')

        // Expect (promises)
        if (isAsync) {
          expect(result).to.satisfy(isPromise), result = await result
        } else {
          expect(result).to.not.satisfy(isPromise)
        }

        // Expect (result)
        expect(result).to.be.false
      })

      it('should return `true` if file at `id`', async () => {
        // Act
        let result = subject.fileExists('package.json')

        // Expect (promises)
        if (isAsync) {
          expect(result).to.satisfy(isPromise), result = await result
        } else {
          expect(result).to.not.satisfy(isPromise)
        }

        // Expect (result)
        expect(result).to.be.true
      })
    })

    describe('getCurrentDirectory', () => {
      let root: URL
      let subject: ModuleResolutionHost

      beforeAll(() => {
        root = pathe.pathToFileURL(pathe.cwd())
        subject = testSubject({ fs, root })
      })

      it('should return path to current working directory', () => {
        // Act
        const result = subject.getCurrentDirectory()

        // Expect
        expect(result).to.eq(withTrailingSlash(pathe.toPath(root)))
      })
    })

    describe('getDirectories', () => {
      let subject: ModuleResolutionHost

      beforeAll(() => {
        subject = testSubject({ fs })
      })

      beforeEach(() => {
        vi.spyOn(fs, 'readdir').mockImplementation((): Awaitable<Dirent[]> => {
          return isAsync ? new Promise(resolve => resolve(content)) : content
        })
      })

      it.each<Parameters<ModuleResolutionHost['getDirectories']>>([
        ['lib'],
        [mlly.cwd()]
      ])('should return list of subdirectory names (%#)', async parent => {
        // Act
        let result = subject.getDirectories(parent)

        // Expect (promises)
        if (isAsync) {
          expect(result).to.satisfy(isPromise), result = await result
        } else {
          expect(result).to.not.satisfy(isPromise)
        }

        // Expect (result)
        expect(result).to.be.an('array')
        expect(result).toMatchSnapshot()
      })
    })

    describe('readFile', () => {
      let subject: ModuleResolutionHost

      beforeAll(() => {
        subject = testSubject({ fs })
      })

      it.each<Parameters<ModuleResolutionHost['readFile']>>([
        ['index.mjs'],
        [pathe.pathToFileURL('__fixtures__/tsconfigs/tsconfig.empty.json')]
      ])('should return file contents (%#)', async id => {
        // Act
        let result = subject.readFile(id)

        // Expect (promises)
        if (isAsync) {
          expect(result).to.satisfy(isPromise), result = await result
        } else {
          expect(result).to.not.satisfy(isPromise)
        }

        // Expect (snapshot)
        expect(result).toMatchSnapshot()
      })
    })

    describe('realpath', () => {
      let subject: ModuleResolutionHost

      beforeAll(() => {
        subject = testSubject({ fs })
      })

      it.each<Parameters<ModuleResolutionHost['realpath']>>([
        [mlly.cwd()],
        [pathe.pathToFileURL('src/index.mts')]
      ])('should return canonical pathname (%#)', async id => {
        // Act
        let result = subject.realpath(id)

        // Expect (promises)
        if (isAsync) {
          expect(result).to.satisfy(isPromise), result = await result
        } else {
          expect(result).to.not.satisfy(isPromise)
        }

        // Expect (result)
        expect(result).to.be.a('string')
        expect(result).toMatchSnapshot()
      })
    })
  })
})
