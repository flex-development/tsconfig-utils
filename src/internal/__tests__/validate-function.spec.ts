/**
 * @file Unit Tests - validateFunction
 * @module tsconfig-utils/internal/tests/unit/validateFunction
 */

import { ErrorCode, type NodeError } from '@flex-development/errnode'
import testSubject from '../validate-function'

describe('unit:internal/validateFunction', () => {
  let name: string

  beforeEach(() => {
    name = 'fn'
  })

  it('should return true if value is a function', () => {
    expect(testSubject(vi.fn(), name)).to.be.true
  })

  it('should throw if value is not a function', () => {
    // Arrange
    const code: ErrorCode = ErrorCode.ERR_INVALID_ARG_TYPE
    let error: NodeError<TypeError>

    // Act
    try {
      testSubject(faker.git.commitSha(), name)
    } catch (e: unknown) {
      error = e as typeof error
    }

    // Expect
    expect(error!).to.be.instanceof(TypeError)
    expect(error!).to.have.property('code').equal(code)
  })
})
