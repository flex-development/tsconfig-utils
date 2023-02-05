/**
 * @file Unit Tests - loadLibConfig
 * @module tsconfig-utils/utils/tests/unit/loadLibConfig
 */

import type { Spy } from '#tests/interfaces'
import getTsconfigJson from '#tests/utils/get-tsconfig-json'
import type { Lib } from '@flex-development/tsconfig-types'
import loadCompilerOptions from '../load-compiler-options'
import testSubject from '../load-lib-config'

vi.mock('../load-compiler-options')

describe('unit:utils/loadLibConfig', () => {
  let id: string
  let loadCompilerOptionsMock: Spy<typeof loadCompilerOptions>

  beforeAll(() => {
    id = 'tsconfig.json'
    loadCompilerOptionsMock =
      loadCompilerOptions as unknown as typeof loadCompilerOptionsMock
  })

  it('should return Lib array', () => {
    // Arrange
    const lib: Lib[] = getTsconfigJson(id)!.compilerOptions!.lib!

    // Act + Expect
    expect(testSubject(id)).to.deep.equal(lib)
  })

  it('should return empty array if compilerOptions.lib is NIL', () => {
    // Arrange
    loadCompilerOptionsMock.mockReturnValueOnce({})

    // Act + Expect
    expect(testSubject(id)).to.deep.equal([])
  })
})
