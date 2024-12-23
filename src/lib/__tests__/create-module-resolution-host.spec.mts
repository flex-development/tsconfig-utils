/**
 * @file Unit Tests - createModuleResolutionHost
 * @module tsconfig-utils/lib/tests/unit/createModuleResolutionHost
 */

import testSubject from '#lib/create-module-resolution-host'
import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type { ModuleResolutionHost } from '@flex-development/tsconfig-utils'
import ts from 'typescript'

describe('unit:lib/createModuleResolutionHost', () => {
  let subject: ModuleResolutionHost

  beforeAll(() => {
    subject = testSubject()
  })

  describe('host', () => {
    describe('directoryExists', () => {
      it.each<Parameters<ModuleResolutionHost['directoryExists']>>([
        [import.meta.url],
        [new URL('node:fs')]
      ])('should return `false` if `id` is not a directory (%j)', id => {
        expect(subject.directoryExists(id)).to.be.false
      })

      it.each<Parameters<ModuleResolutionHost['directoryExists']>>([
        [String(pathe.cwd())],
        [new URL(mlly.cwd())]
      ])('should return `true` if `id` is a directory (%j)', id => {
        expect(subject.directoryExists(id)).to.be.true
      })
    })

    describe('fileExists', () => {
      it.each<Parameters<ModuleResolutionHost['fileExists']>>([
        ['package-lock.json'],
        [String(pathe.cwd())],
        [new URL(mlly.cwd())]
      ])('should return `false` if `id` is not a file  (%j)', id => {
        expect(subject.fileExists(id)).to.be.false
      })

      it.each<Parameters<ModuleResolutionHost['fileExists']>>([
        ['package.json'],
        [String(new URL('vitest.config.mts', mlly.cwd()))],
        [import.meta.url]
      ])('should return `true` if `id` is a file (%j)', id => {
        expect(subject.fileExists(id)).to.be.true
      })
    })

    describe('getCurrentDirectory', () => {
      it('should return path to current working directory', () => {
        expect(subject.getCurrentDirectory()).to.eq(pathe.cwd() + pathe.sep)
      })
    })

    describe('getDirectories', () => {
      it('should return list of subdirectory names', () => {
        // Arrange
        const id: string = pathe.dirname(pathe.dirname(import.meta.url))
        const path: string = pathe.fileURLToPath(id)

        // Act + Expect
        expect(subject.getDirectories(id)).to.eql(ts.sys.getDirectories(path))
      })
    })

    describe('readFile', () => {
      it('should return `undefined` if file does not exist at `id`', () => {
        // Arrange
        const id: string = 'src/index.cts'

        // Act + Expect
        expect(subject.readFile(id)).to.eq(ts.sys.readFile(id)).and.be.undefined
      })

      it.each<Parameters<ModuleResolutionHost['readFile']>>([
        ['src/index.mts'],
        [import.meta.url]
      ])('should return contents of file at `id` (%j)', id => {
        // Arrange
        const path: string = pathe.toPath(id)

        // Act
        const result = subject.readFile(id)

        // Expect
        expect(result).to.eq(ts.sys.readFile(path)).and.not.be.undefined
      })
    })

    describe('realpath', () => {
      it.each<Parameters<ModuleResolutionHost['realpath']>>([
        ['src/lib/..'],
        [pathe.dirname(import.meta.url) + pathe.sep + pathe.dot.repeat(2)]
      ])('should return canonical pathname of `id` (%j)', id => {
        // Arrange
        const path: string = pathe.toPath(id)

        // Act
        const result = subject.realpath(id)

        // Expect
        expect(result).to.eq(ts.sys.realpath!(path)).and.not.be.undefined
      })
    })
  })
})
