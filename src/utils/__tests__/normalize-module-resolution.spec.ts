/**
 * @file Unit Tests - normalizeModuleResolution
 * @module tsconfig-utils/utils/tests/unit/normalizeModuleResolution
 */

import { ModuleResolutionKind } from '@flex-development/tsconfig-types'
import ts from 'typescript'
import testSubject from '../normalize-module-resolution'

describe('unit:utils/normalizeModuleResolution', () => {
  it('should return normalized compiler option', () => {
    // Arrange
    const cases: [
      ...Parameters<typeof testSubject>,
      ts.ModuleResolutionKind
    ][] = [
      // @ts-ignore ts(2551)
      ['Bundler', ts.ModuleResolutionKind.Bundler],
      ['Classic', ts.ModuleResolutionKind.Classic],
      // @ts-ignore ts(2551)
      ['Node', ts.ModuleResolutionKind.NodeJs],
      // @ts-ignore ts(2551)
      ['Node10', ts.ModuleResolutionKind.Node10],
      ['Node16', ts.ModuleResolutionKind.Node16],
      ['NodeNext', ts.ModuleResolutionKind.NodeNext],
      // @ts-ignore ts(2551)
      [ModuleResolutionKind.Bundler, ts.ModuleResolutionKind.Bundler],
      [ModuleResolutionKind.Classic, ts.ModuleResolutionKind.Classic],
      // @ts-ignore ts(2551)
      [ModuleResolutionKind.Node10, ts.ModuleResolutionKind.Node10],
      [ModuleResolutionKind.Node16, ts.ModuleResolutionKind.Node16],
      // @ts-ignore ts(2551)
      [ModuleResolutionKind.NodeJs, ts.ModuleResolutionKind.NodeJs],
      [ModuleResolutionKind.NodeNext, ts.ModuleResolutionKind.NodeNext],
      // @ts-ignore ts(2551)
      [ts.ModuleResolutionKind.Bundler, ts.ModuleResolutionKind.Bundler],
      [ts.ModuleResolutionKind.Classic, ts.ModuleResolutionKind.Classic],
      // @ts-ignore ts(2551)
      [ts.ModuleResolutionKind.Node10, ts.ModuleResolutionKind.Node10],
      [ts.ModuleResolutionKind.Node16, ts.ModuleResolutionKind.Node16],
      // @ts-ignore ts(2551)
      [ts.ModuleResolutionKind.NodeJs, ts.ModuleResolutionKind.NodeJs],
      [ts.ModuleResolutionKind.NodeNext, ts.ModuleResolutionKind.NodeNext]
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
