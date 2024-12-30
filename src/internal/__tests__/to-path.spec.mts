/**
 * @file Unit Tests - toPath
 * @module tsconfig-utils/internal/tests/unit/toPath
 */

import testSubject from '#internal/to-path'
import { codes, isNodeError, type NodeError } from '@flex-development/errnode'
import pathe from '@flex-development/pathe'

describe('unit:internal/toPath', () => {
  it.each<[URL | string]>([
    [new URL('file:///tsconfig.json')],
    [pathe.dot + pathe.sep + 'tsconfig.json']
  ])('should return `input` as path (%j)', input => {
    // Act
    const result = testSubject(input)

    // Expect
    expect(result).toMatchSnapshot()
  })

  it.each<[URL | string]>([
    ['node:test'],
    [new URL('node:test/reporters')]
  ])('should throw if `input` is not a path or `file:` URL (%j)', input => {
    // Arrange
    let error!: NodeError

    // Act
    try {
      testSubject(input)
    } catch (e: unknown) {
      error = e as typeof error
    }

    // Expect
    expect(error).to.satisfy(isNodeError)
    expect(error).to.have.property('code', codes.ERR_INVALID_URL_SCHEME)
    expect(error).to.have.property('message').match(/of scheme file/)
  })
})
