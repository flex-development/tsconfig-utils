/**
 * @file Unit Tests - getTsconfig
 * @module tsconfig-utils/internal/tests/unit/getTsconfig
 */

import tsconfig from '#fixtures/tsconfig.json' with { type: 'json' }
import testSubject from '#internal/get-tsconfig'

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
