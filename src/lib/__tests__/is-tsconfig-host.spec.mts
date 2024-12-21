/**
 * @file Unit Tests - isTsconfigHost
 * @module tsconfig-utils/lib/tests/unit/isTsconfigHost
 */

import tsconfig from '#fixtures/tsconfig.json' with { type: 'json' }
import testSubject from '#lib/is-tsconfig-host'

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
