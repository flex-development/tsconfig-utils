/**
 * @file Unit Tests - mergeTsconfig
 * @module tsconfig-utils/lib/tests/unit/mergeTsconfig
 */

import tsconfigB from '#fixtures/tsconfig.build.json' with { type: 'json' }
import tsconfig from '#fixtures/tsconfig.json' with { type: 'json' }
import testSubject from '#lib/merge-tsconfig'
import type { Tsconfig, TsconfigHost } from '@flex-development/tsconfig-utils'
import { clone } from '@flex-development/tutils'
import strictest from '@tsconfig/strictest/tsconfig.json' with { type: 'json' }

describe('unit:lib/mergeTsconfig', () => {
  it('should return merged tsconfig (target:Tsconfig)', () => {
    // Arrange
    const target: Tsconfig = clone(tsconfig)

    // Act
    const result = testSubject(target, null, tsconfigB)

    expect(result).to.eq(target)
    expect(result).toMatchSnapshot()
  })

  it('should return merged tsconfig (target:TsconfigHost)', () => {
    // Arrange
    const target: TsconfigHost = { tsconfig: clone(strictest as Tsconfig) }

    // Act
    const result = testSubject(target, null, tsconfig)

    expect(result).to.eq(target.tsconfig)
    expect(result).toMatchSnapshot()
  })
})
