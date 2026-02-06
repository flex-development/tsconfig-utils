/**
 * @file Unit Tests - isResolvedTsconfig
 * @module tsconfig-utils/lib/tests/unit/isResolvedTsconfig
 */

import testSubject from '#lib/is-resolved-tsconfig'
import tsconfig from '#tsconfig' with { type: 'json' }
import * as mlly from '@flex-development/mlly'

describe('unit:lib/isResolvedTsconfig', () => {
  it.each<Parameters<typeof testSubject>>([
    [tsconfig],
    [{ tsconfig, url: null }]
  ])('should return `false` if `value` is not `ResolvedTsconfig` (%#)', val => {
    expect(testSubject(val)).to.be.false
  })

  it('should return `true` if `value` is `ResolvedTsconfig`', () => {
    // Arrange
    const url: URL = new URL('tsconfig.json', mlly.cwd())

    // Act + Expect
    expect(testSubject({ tsconfig, url })).to.be.true
  })
})
