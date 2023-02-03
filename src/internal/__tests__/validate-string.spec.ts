/**
 * @file Unit Tests - validateString
 * @module tsconfig-utils/internal/tests/unit/validateString
 */

import { ErrorCode, type NodeError } from '@flex-development/errnode'
import testSubject from '../validate-string'

describe('unit:internal/validateString', () => {
  let name: string

  beforeEach(() => {
    name = 'id'
  })

  it('should return true if value is typeof string', () => {
    expect(testSubject(faker.string.uuid(), name)).to.be.true
  })

  it('should throw if value is not typeof string', () => {
    // Arrange
    const code: ErrorCode = ErrorCode.ERR_INVALID_ARG_TYPE
    let error: NodeError<TypeError>

    // Act
    try {
      testSubject(faker.number.int(), name)
    } catch (e: unknown) {
      error = e as typeof error
    }

    // Expect
    expect(error!).to.be.instanceof(TypeError)
    expect(error!).to.have.property('code').equal(code)
  })
})
