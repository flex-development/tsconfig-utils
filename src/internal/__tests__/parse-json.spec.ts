/**
 * @file Unit Tests - parseJSON
 * @module tsconfig-utils/internal/tests/unit/parseJSON
 */

import testSubject from '../parse-json'

describe('unit:internal/parseJSON', () => {
  it('should return parsed JSON value', () => {
    // Arrange
    const json: string = '{\n\t// Rainbows\n\t"unicorn": "cake"\n}'

    // Act + Expect
    expect(testSubject(json)).to.deep.equal({ unicorn: 'cake' })
  })
})
