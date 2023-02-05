/**
 * @file Unit Tests - loadPathAliases
 * @module tsconfig-utils/utils/tests/unit/loadPathAliases
 */

import type { Spy } from '#tests/interfaces'
import getTsconfigJson from '#tests/utils/get-tsconfig-json'
import type { Paths } from '@flex-development/tsconfig-types'
import loadCompilerOptions from '../load-compiler-options'
import testSubject from '../load-path-aliases'

vi.mock('../load-compiler-options')

describe('unit:utils/loadPathAliases', () => {
  let id: string
  let loadCompilerOptionsMock: Spy<typeof loadCompilerOptions>

  beforeAll(() => {
    id = 'tsconfig.json'
    loadCompilerOptionsMock =
      loadCompilerOptions as unknown as typeof loadCompilerOptionsMock
  })

  it('should return Paths object', () => {
    // Arrange
    const paths: Paths = getTsconfigJson(id)!.compilerOptions!.paths!

    // Act + Expect
    expect(testSubject(id)).to.deep.equal(paths)
  })

  it('should return empty object if compilerOptions.paths is NIL', () => {
    // Arrange
    loadCompilerOptionsMock.mockReturnValueOnce({})

    // Act + Expect
    expect(testSubject(id)).to.deep.equal({})
  })
})
