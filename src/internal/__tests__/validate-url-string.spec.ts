/**
 * @file Unit Tests - validateURLString
 * @module tsconfig-utils/internal/tests/unit/validateURLString
 */

import { ErrorCode, type NodeError } from '@flex-development/errnode'
import { cast } from '@flex-development/tutils'
import { URL } from 'node:url'
import testSubject from '../validate-url-string'

describe('unit:internal/validateURLString', () => {
  let name: string

  beforeEach(() => {
    name = 'id'
  })

  it('should return true if value is instance of URL', () => {
    expect(testSubject(new URL(import.meta.url), name)).to.be.true
  })

  it('should return true if value is typeof string', () => {
    expect(testSubject(import.meta.url, name)).to.be.true
  })

  it('should throw if value is not instance of URL or typeof string', () => {
    // Arrange
    const code: ErrorCode = ErrorCode.ERR_INVALID_ARG_TYPE
    let error!: NodeError<TypeError>

    // Act
    try {
      testSubject(faker.datatype.boolean(), name)
    } catch (e: unknown) {
      error = cast(e)
    }

    // Expect
    expect(error).to.be.instanceof(TypeError).and.have.property('code', code)
  })
})
