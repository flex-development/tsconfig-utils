/**
 * @file Unit Tests - isTsconfigHost
 * @module tsconfig-utils/lib/tests/unit/isTsconfigHost
 */

import testSubject from '#lib/is-tsconfig-host'
import tsconfig from '#tsconfig' with { type: 'json' }

describe('unit:lib/isTsconfigHost', () => {
  it.each<Parameters<typeof testSubject>>([
    [null],
    [[tsconfig]]
  ])('should return `false` if `value` is not `TsconfigHost` (%#)', val => {
    expect(testSubject(val)).to.be.false
  })

  it('should return `true` if `value` is `TsconfigHost`', () => {
    expect(testSubject({ tsconfig })).to.be.true
  })
})
