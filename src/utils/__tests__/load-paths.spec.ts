/**
 * @file Unit Tests - loadPaths
 * @module tsconfig-utils/utils/tests/unit/loadPaths
 */

import type { Spy } from '#tests/interfaces'
import getTsconfigJson from '#tests/utils/get-tsconfig-json'
import loadCompilerOptions from '../load-compiler-options'
import testSubject from '../load-paths'

vi.mock('../load-compiler-options')

describe('unit:utils/loadPaths', () => {
  let loadCompilerOptionsMock: Spy<typeof loadCompilerOptions>
  let tsconfig: string

  beforeAll(() => {
    loadCompilerOptionsMock =
      loadCompilerOptions as unknown as typeof loadCompilerOptionsMock
    tsconfig = 'tsconfig.json'
  })

  it('should return Paths object', () => {
    // Arrange
    const { paths } = getTsconfigJson(tsconfig)!.compilerOptions!

    // Act + Expect
    expect(testSubject(tsconfig)).to.deep.equal(paths)
  })

  it('should return empty object if compilerOptions.paths is NIL', () => {
    // Arrange
    loadCompilerOptionsMock.mockReturnValueOnce({})

    // Act + Expect
    expect(testSubject(tsconfig)).to.deep.equal({})
  })
})
