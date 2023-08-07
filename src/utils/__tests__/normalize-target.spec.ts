/**
 * @file Unit Tests - normalizeTarget
 * @module tsconfig-utils/utils/tests/unit/normalizeTarget
 */

import { ScriptTarget } from '@flex-development/tsconfig-types'
import ts from 'typescript'
import testSubject from '../normalize-target'

describe('unit:utils/normalizeTarget', () => {
  it('should return normalized compiler option', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, ts.ScriptTarget][] = [
      ['ES3', ts.ScriptTarget.ES3],
      ['ES5', ts.ScriptTarget.ES5],
      ['ES6', ts.ScriptTarget.ES2015],
      ['ES2015', ts.ScriptTarget.ES2015],
      ['ES2016', ts.ScriptTarget.ES2016],
      ['ES2017', ts.ScriptTarget.ES2017],
      ['ES2018', ts.ScriptTarget.ES2018],
      ['ES2019', ts.ScriptTarget.ES2019],
      ['ES2020', ts.ScriptTarget.ES2020],
      ['ES2021', ts.ScriptTarget.ES2021],
      ['ES2022', ts.ScriptTarget.ES2022],
      ['ESNext', ts.ScriptTarget.ESNext],
      [ScriptTarget.ES3, ts.ScriptTarget.ES3],
      [ScriptTarget.ES5, ts.ScriptTarget.ES5],
      [ScriptTarget.ES6, ts.ScriptTarget.ES2015],
      [ScriptTarget.ES2015, ts.ScriptTarget.ES2015],
      [ScriptTarget.ES2016, ts.ScriptTarget.ES2016],
      [ScriptTarget.ES2017, ts.ScriptTarget.ES2017],
      [ScriptTarget.ES2018, ts.ScriptTarget.ES2018],
      [ScriptTarget.ES2019, ts.ScriptTarget.ES2019],
      [ScriptTarget.ES2020, ts.ScriptTarget.ES2020],
      [ScriptTarget.ES2021, ts.ScriptTarget.ES2021],
      [ScriptTarget.ES2022, ts.ScriptTarget.ES2022],
      [ScriptTarget.ESNext, ts.ScriptTarget.ESNext],
      [ts.ScriptTarget.ES3, ts.ScriptTarget.ES3],
      [ts.ScriptTarget.ES5, ts.ScriptTarget.ES5],
      [ts.ScriptTarget.ES2015, ts.ScriptTarget.ES2015],
      [ts.ScriptTarget.ES2016, ts.ScriptTarget.ES2016],
      [ts.ScriptTarget.ES2017, ts.ScriptTarget.ES2017],
      [ts.ScriptTarget.ES2018, ts.ScriptTarget.ES2018],
      [ts.ScriptTarget.ES2019, ts.ScriptTarget.ES2019],
      [ts.ScriptTarget.ES2020, ts.ScriptTarget.ES2020],
      [ts.ScriptTarget.ES2021, ts.ScriptTarget.ES2021],
      [ts.ScriptTarget.ES2022, ts.ScriptTarget.ES2022],
      [ts.ScriptTarget.ESNext, ts.ScriptTarget.ESNext],
      [ts.ScriptTarget.JSON, ts.ScriptTarget.JSON]
    ]

    // Act + Expect
    cases.forEach(([option, expected]) => {
      expect(testSubject(option)).to.equal(expected)
    })
  })

  it('should return undefined if option cannot be normalized', () => {
    expect(testSubject(Number.NaN)).to.be.undefined
  })
})
