/**
 * @file Unit Tests - getTsconfig
 * @module tsconfig-utils/internal/tests/unit/getTsconfig
 */

import testSubject from '#internal/get-tsconfig'
import tsconfig from '#tsconfig' with { type: 'json' }

describe('unit:internal/getTsconfig', () => {
  it('should return tsconfig object (Tsconfig)', () => {
    expect(testSubject(tsconfig)).to.eq(tsconfig)
  })

  it('should return tsconfig object (TsconfigHost)', () => {
    expect(testSubject({ tsconfig })).to.eq(tsconfig)
  })

  it('should return tsconfig object (nil)', () => {
    expect(testSubject(null)).to.eql({})
  })
})
