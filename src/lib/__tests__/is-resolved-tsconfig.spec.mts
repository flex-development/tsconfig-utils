/**
 * @file Unit Tests - isResolvedTsconfig
 * @module tsconfig-utils/lib/tests/unit/isResolvedTsconfig
 */

import tsconfig from '#fixtures/tsconfig.json' with { type: 'json' }
import testSubject from '#lib/is-resolved-tsconfig'
import { cwd } from '@flex-development/mlly'

describe('unit:lib/isResolvedTsconfig', () => {
  it.each<Parameters<typeof testSubject>>([
    [tsconfig],
    [{ tsconfig, url: null }]
  ])('should return `false` if `value` is not `ResolvedTsconfig` (%#)', val => {
    expect(testSubject(val)).to.be.false
  })

  it('should return `true` if `value` is `ResolvedTsconfig`', () => {
    // Arrange
    const url: URL = new URL('tsconfig.json', cwd())

    // Act + Expect
    expect(testSubject({ tsconfig, url })).to.be.true
  })
})
