/**
 * @file Unit Tests - loadLib
 * @module tsconfig-utils/utils/tests/unit/loadLib
 */

import type { Spy } from '#tests/interfaces'
import getTsconfigJson from '#tests/utils/get-tsconfig-json'
import loadCompilerOptions from '../load-compiler-options'
import testSubject from '../load-lib'

vi.mock('../load-compiler-options')

describe('unit:utils/loadLib', () => {
  let loadCompilerOptionsMock: Spy<typeof loadCompilerOptions>
  let tsconfig: string

  beforeAll(() => {
    loadCompilerOptionsMock = vi.mocked(loadCompilerOptions)
    tsconfig = 'tsconfig.json'
  })

  it('should return Lib array', () => {
    // Arrange
    const { lib } = getTsconfigJson(tsconfig)!.compilerOptions!

    // Act + Expect
    expect(testSubject(tsconfig)).to.eql(lib)
  })

  it('should return empty array if compilerOptions.lib is NIL', () => {
    // Arrange
    loadCompilerOptionsMock.mockReturnValueOnce({})

    // Act + Expect
    expect(testSubject(tsconfig)).to.eql([])
  })
})
