/**
 * @file Unit Tests - normalizeJsx
 * @module tsconfig-utils/utils/tests/unit/normalizeJsx
 */

import { JsxEmit } from '@flex-development/tsconfig-types'
import ts from 'typescript'
import testSubject from '../normalize-jsx'

describe('unit:utils/normalizeJsx', () => {
  it('should return normalized compiler option', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, ts.JsxEmit][] = [
      [JsxEmit.Preserve, ts.JsxEmit.Preserve],
      [JsxEmit.React, ts.JsxEmit.React],
      [JsxEmit.ReactJSX, ts.JsxEmit.ReactJSX],
      [JsxEmit.ReactJSXDev, ts.JsxEmit.ReactJSXDev],
      [JsxEmit.ReactNative, ts.JsxEmit.ReactNative],
      [ts.JsxEmit.None, ts.JsxEmit.None],
      [ts.JsxEmit.Preserve, ts.JsxEmit.Preserve],
      [ts.JsxEmit.React, ts.JsxEmit.React],
      [ts.JsxEmit.ReactJSX, ts.JsxEmit.ReactJSX],
      [ts.JsxEmit.ReactJSXDev, ts.JsxEmit.ReactJSXDev],
      [ts.JsxEmit.ReactNative, ts.JsxEmit.ReactNative]
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
