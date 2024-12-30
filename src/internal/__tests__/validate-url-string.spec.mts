/**
 * @file Unit Tests - validateURLString
 * @module tsconfig-utils/internal/tests/unit/validateURLString
 */

import testSubject from '#internal/validate-url-string'
import { codes, isNodeError, type NodeError } from '@flex-development/errnode'

describe('unit:internal/validateURLString', () => {
  let name: string

  beforeAll(() => {
    name = 'value'
  })

  it('should return `true` if `value` is a `URL`', () => {
    expect(testSubject(new URL(import.meta.url), name)).to.be.true
  })

  it('should return `true` if `value` is a string', () => {
    expect(testSubject(import.meta.url, name)).to.be.true
  })

  it('should throw if `value` is not a `URL` or string', () => {
    // Arrange
    let error!: NodeError

    // Act
    try {
      testSubject(null, name)
    } catch (e: unknown) {
      error = e as typeof error
    }

    // Expect
    expect(error).to.satisfy(isNodeError)
    expect(error).to.have.property('code', codes.ERR_INVALID_ARG_TYPE)
  })
})
