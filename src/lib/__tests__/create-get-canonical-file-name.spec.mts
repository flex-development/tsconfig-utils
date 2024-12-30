/**
 * @file Unit Tests - createGetCanonicalFileName
 * @module tsconfig-utils/lib/tests/unit/createGetCanonicalFileName
 */

import toPath from '#internal/to-path'
import testSubject from '#lib/create-get-canonical-file-name'
import pathe from '@flex-development/pathe'
import { lowercase } from '@flex-development/tutils'

describe('unit:lib/createGetCanonicalFileName', () => {
  it('should return canonical filename of `id`', () => {
    // Arrange
    const id: URL = new URL('file:///creatE-geT-canonicaL-filE-namE.mts')

    // Act
    const result = testSubject()(id)

    // Expect
    expect(result).to.be.a('string').and.not.satisfy(pathe.isURL)
    expect(lowercase(result)).to.eql(lowercase(toPath(id)))
  })
})
