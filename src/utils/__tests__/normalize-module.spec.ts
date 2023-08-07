/**
 * @file Unit Tests - normalizeModule
 * @module tsconfig-utils/utils/tests/unit/normalizeModule
 */

import { ModuleKind } from '@flex-development/tsconfig-types'
import ts from 'typescript'
import testSubject from '../normalize-module'

describe('unit:utils/normalizeModule', () => {
  it('should return normalized compiler option', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, ts.ModuleKind][] = [
      ['AMD', ts.ModuleKind.AMD],
      ['CommonJS', ts.ModuleKind.CommonJS],
      ['ES6', ts.ModuleKind.ES2015],
      ['ES2015', ts.ModuleKind.ES2015],
      ['ES2020', ts.ModuleKind.ES2020],
      ['ES2022', ts.ModuleKind.ES2022],
      ['ESNext', ts.ModuleKind.ESNext],
      ['Node16', ts.ModuleKind.Node16],
      ['NodeNext', ts.ModuleKind.NodeNext],
      ['None', ts.ModuleKind.None],
      ['System', ts.ModuleKind.System],
      ['UMD', ts.ModuleKind.UMD],
      [ModuleKind.AMD, ts.ModuleKind.AMD],
      [ModuleKind.CommonJS, ts.ModuleKind.CommonJS],
      [ModuleKind.ES6, ts.ModuleKind.ES2015],
      [ModuleKind.ES2015, ts.ModuleKind.ES2015],
      [ModuleKind.ES2020, ts.ModuleKind.ES2020],
      [ModuleKind.ES2022, ts.ModuleKind.ES2022],
      [ModuleKind.ESNext, ts.ModuleKind.ESNext],
      [ModuleKind.Node16, ts.ModuleKind.Node16],
      [ModuleKind.NodeNext, ts.ModuleKind.NodeNext],
      [ModuleKind.None, ts.ModuleKind.None],
      [ModuleKind.System, ts.ModuleKind.System],
      [ModuleKind.UMD, ts.ModuleKind.UMD],
      [ts.ModuleKind.AMD, ts.ModuleKind.AMD],
      [ts.ModuleKind.CommonJS, ts.ModuleKind.CommonJS],
      [ts.ModuleKind.ES2015, ts.ModuleKind.ES2015],
      [ts.ModuleKind.ES2020, ts.ModuleKind.ES2020],
      [ts.ModuleKind.ES2022, ts.ModuleKind.ES2022],
      [ts.ModuleKind.ESNext, ts.ModuleKind.ESNext],
      [ts.ModuleKind.Node16, ts.ModuleKind.Node16],
      [ts.ModuleKind.NodeNext, ts.ModuleKind.NodeNext],
      [ts.ModuleKind.None, ts.ModuleKind.None],
      [ts.ModuleKind.System, ts.ModuleKind.System],
      [ts.ModuleKind.UMD, ts.ModuleKind.UMD]
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
