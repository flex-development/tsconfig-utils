/**
 * @file E2E Tests - api
 * @module tsconfig-utils/tests/e2e/api
 */

import * as testSubject from '@flex-development/tsconfig-utils'

describe('e2e:tsconfig-utils', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
