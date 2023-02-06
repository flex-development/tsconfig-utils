/**
 * @file Unit Tests - normalizeLib
 * @module tsconfig-utils/utils/tests/unit/normalizeLib
 */

import LIB from '../lib'
import testSubject from '../normalize-lib'

describe('unit:utils/normalizeLib', () => {
  it('should return empty array if option cannot be normalized', () => {
    expect(testSubject(faker.string.sample())).to.be.empty
  })

  it('should return normalized compiler option', () => {
    expect(testSubject([...LIB.keys()])).to.deep.equal([...LIB.values()])
  })
})
