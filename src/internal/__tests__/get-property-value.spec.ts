/**
 * @file Unit Tests - getPropertyValue
 * @module tsconfig-utils/internal/tests/unit/getPropertyValue
 */

import testSubject from '../get-property-value'

describe('unit:internal/getPropertyValue', () => {
  it('should return extracted property value', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, unknown][] = [
      [null, 'property', undefined],
      [{ target: 'es2020' }, 'target', 'es2020']
    ]

    // Act + Expect
    cases.forEach(([object, property, expected]) => {
      expect(testSubject(object, property)).to.equal(expected)
    })
  })
})
