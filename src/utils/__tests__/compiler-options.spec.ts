/**
 * @file Unit Tests - COMPILER_OPTIONS
 * @module tsconfig-utils/utils/tests/unit/COMPILER_OPTIONS
 */

import BASELINE from '#tests/baselines/compiler-options'
import TEST_SUBJECT from '../compiler-options'

describe('unit:utils/COMPILER_OPTIONS', () => {
  it('should be instance of Set', () => {
    expect(TEST_SUBJECT).to.be.instanceof(Set)
  })

  it('should contain compiler option names', () => {
    expect([...TEST_SUBJECT]).to.eql(BASELINE)
  })
})
