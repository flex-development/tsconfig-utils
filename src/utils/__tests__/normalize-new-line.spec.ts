/**
 * @file Unit Tests - normalizeNewLine
 * @module tsconfig-utils/utils/tests/unit/normalizeNewLine
 */

import { NewLineKind } from '@flex-development/tsconfig-types'
import ts from 'typescript'
import testSubject from '../normalize-new-line'

describe('unit:utils/normalizeNewLine', () => {
  it('should return normalized compiler option', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, ts.NewLineKind][] = [
      [
        NewLineKind.CarriageReturnLineFeed,
        ts.NewLineKind.CarriageReturnLineFeed
      ],
      [
        NewLineKind.CarriageReturnLineFeed.toUpperCase(),
        ts.NewLineKind.CarriageReturnLineFeed
      ],
      [NewLineKind.LineFeed, ts.NewLineKind.LineFeed],
      [NewLineKind.LineFeed.toUpperCase(), ts.NewLineKind.LineFeed]
    ]

    // Act + Expect
    cases.forEach(([option, expected]) => {
      expect(testSubject(option)).to.equal(expected)
    })
  })

  it('should return undefined if option cannot be normalized', () => {
    expect(testSubject(null)).to.be.undefined
  })
})
