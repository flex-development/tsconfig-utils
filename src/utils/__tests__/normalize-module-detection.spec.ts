/**
 * @file Unit Tests - normalizeModuleDetection
 * @module tsconfig-utils/utils/tests/unit/normalizeModuleDetection
 */

import { ModuleDetectionKind } from '@flex-development/tsconfig-types'
import ts from 'typescript'
import testSubject from '../normalize-module-detection'

describe('unit:utils/normalizeModuleDetection', () => {
  it('should return normalized compiler option', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, ts.ModuleDetectionKind][] =
      [
        [ModuleDetectionKind.Auto, ts.ModuleDetectionKind.Auto],
        [ModuleDetectionKind.Force, ts.ModuleDetectionKind.Force],
        [ModuleDetectionKind.Legacy, ts.ModuleDetectionKind.Legacy],
        [ts.ModuleDetectionKind.Auto, ts.ModuleDetectionKind.Auto],
        [ts.ModuleDetectionKind.Force, ts.ModuleDetectionKind.Force],
        [ts.ModuleDetectionKind.Legacy, ts.ModuleDetectionKind.Legacy]
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
