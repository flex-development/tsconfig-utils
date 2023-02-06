/**
 * @file Unit Tests - LIB
 * @module tsconfig-utils/utils/tests/unit/LIB
 */

import BASELINE from '#tests/baselines/lib'
import TEST_SUBJECT from '../lib'

describe('unit:utils/LIB', () => {
  it('should be instance of Map', () => {
    expect(TEST_SUBJECT).to.be.instanceof(Map)
  })

  it('should contain lib names', () => {
    expect([...TEST_SUBJECT.keys()]).to.deep.equal(BASELINE)
  })

  it('should map lib names to lib filenames', () => {
    for (const [name, filename] of TEST_SUBJECT.entries()) {
      expect(filename).to.equal(`lib.${name}.d.ts`)
    }
  })
})
