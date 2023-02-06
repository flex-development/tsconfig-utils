/**
 * @file Unit Tests - normalizeImportsNotUsed
 * @module tsconfig-utils/utils/tests/unit/normalizeImportsNotUsed
 */

import { ImportsNotUsedKind } from '@flex-development/tsconfig-types'
import ts from 'typescript'
import testSubject from '../normalize-imports-not-used'

describe('unit:utils/normalizeImportsNotUsed', () => {
  it('should return normalized compiler option', () => {
    // Arrange
    const cases: [
      ...Parameters<typeof testSubject>,
      ts.ImportsNotUsedAsValues
    ][] = [
      ['Error', ts.ImportsNotUsedAsValues.Error],
      ['Preserve', ts.ImportsNotUsedAsValues.Preserve],
      ['Remove', ts.ImportsNotUsedAsValues.Remove],
      [ImportsNotUsedKind.Error, ts.ImportsNotUsedAsValues.Error],
      [ImportsNotUsedKind.Preserve, ts.ImportsNotUsedAsValues.Preserve],
      [ImportsNotUsedKind.Remove, ts.ImportsNotUsedAsValues.Remove],
      [ts.ImportsNotUsedAsValues.Error, ts.ImportsNotUsedAsValues.Error],
      [ts.ImportsNotUsedAsValues.Preserve, ts.ImportsNotUsedAsValues.Preserve],
      [ts.ImportsNotUsedAsValues.Remove, ts.ImportsNotUsedAsValues.Remove]
    ]

    // Act + Expect
    cases.forEach(([option, expected]) => {
      expect(testSubject(option)).to.equal(expected)
    })
  })

  it('should return undefined if option cannot be normalized', () => {
    expect(testSubject(faker.string.sample())).to.be.undefined
  })
})
