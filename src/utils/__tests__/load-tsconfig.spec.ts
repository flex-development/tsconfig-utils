/**
 * @file Unit Tests - loadTsconfig
 * @module tsconfig-utils/utils/tests/unit/loadTsconfig
 */

import { ErrorCode, type NodeError } from '@flex-development/errnode'
import { pathToFileURL, type URL } from 'node:url'
import testSubject from '../load-tsconfig'

describe('unit:utils/loadTsconfig', () => {
  it('should return TSConfig object if tsconfig file is found', () => {
    // Arrange
    const id: URL = pathToFileURL('__fixtures__/tsconfig.build.json')

    // Act + Expect
    expect(testSubject(id)).toMatchSnapshot()
  })

  it('should return empty object if tsconfig file is empty', () => {
    expect(testSubject('__fixtures__/tsconfig.empty.json')).to.deep.equal({})
  })

  it('should return null if tsconfig file does not exist', () => {
    expect(testSubject('__fixtures__/tsconfig.dev.json')).to.be.null
  })

  describe('throws', () => {
    it('should throw if tsconfig file does not contain valid JSON', () => {
      // Arrange
      const code: ErrorCode = ErrorCode.ERR_OPERATION_FAILED
      let error: NodeError

      // Act
      try {
        testSubject('__fixtures__/tsconfig.invalid-json')
      } catch (e: unknown) {
        error = e as typeof error
      }

      // Expect
      expect(error!).to.not.be.undefined
      expect(error!).to.have.property('code').equal(code)
    })

    it('should throw if tsconfig file does not convert to plain object', () => {
      // Arrange
      const code: ErrorCode = ErrorCode.ERR_INVALID_RETURN_VALUE
      const message_regex: RegExp = /plain object .+ 'parseJSON'/
      let error: NodeError

      // Act
      try {
        testSubject('__fixtures__/tsconfig.invalid-schema')
      } catch (e: unknown) {
        error = e as typeof error
      }

      // Expect
      expect(error!).to.not.be.undefined
      expect(error!).to.have.property('code').equal(code)
      expect(error!).to.have.property('message').match(message_regex)
    })
  })
})
