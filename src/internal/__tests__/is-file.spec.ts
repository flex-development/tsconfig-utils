/**
 * @file Unit Tests - isFile
 * @module tsconfig-utils/internal/tests/unit/isFile
 */

import testSubject from '../is-file'

describe('unit:internal/isFile', () => {
  it('should return false if id does not exist', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      ['file.mjs'],
      ['node_modules/@flex-development/mkbuild/dist/index.mjs/package.json']
    ]

    // Act + Expect
    cases.forEach(([id]) => expect(testSubject(id)).to.be.false)
  })

  it('should return false if id is directory id', () => {
    expect(testSubject('src')).to.be.false
  })

  it('should return true if id is file id', () => {
    expect(testSubject('src/index.ts')).to.be.true
  })
})
