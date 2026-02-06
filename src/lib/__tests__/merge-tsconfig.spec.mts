/**
 * @file Unit Tests - mergeTsconfig
 * @module tsconfig-utils/lib/tests/unit/mergeTsconfig
 */

import tsconfigBuild from '#fixtures/tsconfig.build.json'
import tsconfig from '#fixtures/tsconfig.json'
import strictest from '#fixtures/tsconfig.strictest.json'
import testSubject from '#lib/merge-tsconfig'
import type { Tsconfig } from '@flex-development/tsconfig-types'
import type { TsconfigHost } from '@flex-development/tsconfig-utils'
import { clone } from '@flex-development/tutils'

describe('unit:lib/mergeTsconfig', () => {
  it('should return merged tsconfig (target:Tsconfig)', () => {
    // Arrange
    const target: Tsconfig = clone(tsconfig)

    // Act
    const result = testSubject(target, null, tsconfigBuild)

    expect(result).to.eq(target)
    expect(result).toMatchSnapshot()
  })

  it('should return merged tsconfig (target:TsconfigHost)', () => {
    // Arrange
    const target: TsconfigHost = { tsconfig: clone(strictest) }

    // Act
    const result = testSubject(target, null, tsconfig)

    expect(result).to.eq(target.tsconfig)
    expect(result).toMatchSnapshot()
  })
})
