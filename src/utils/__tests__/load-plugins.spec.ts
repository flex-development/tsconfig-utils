/**
 * @file Unit Tests - loadPlugins
 * @module tsconfig-utils/utils/tests/unit/loadPlugins
 */

import type { Spy } from '#tests/interfaces'
import type { Plugin } from '@flex-development/tsconfig-types'
import loadCompilerOptions from '../load-compiler-options'
import testSubject from '../load-plugins'

vi.mock('../load-compiler-options')

describe('unit:utils/loadPlugins', () => {
  let loadCompilerOptionsMock: Spy<typeof loadCompilerOptions>
  let tsconfig: string

  beforeAll(() => {
    loadCompilerOptionsMock =
      loadCompilerOptions as unknown as typeof loadCompilerOptionsMock
    tsconfig = 'tsconfig.json'
  })

  it('should return Plugin object array', () => {
    // Arrange
    const plugins: Plugin[] = [{ name: 'typescript-styled-plugin' }]
    loadCompilerOptionsMock.mockReturnValueOnce({ plugins })

    // Act + Expect
    expect(testSubject(tsconfig)).to.deep.equal(plugins)
  })

  it('should return empty array if compilerOptions.plugins is NIL', () => {
    // Arrange
    loadCompilerOptionsMock.mockReturnValueOnce({})

    // Act + Expect
    expect(testSubject(tsconfig)).to.deep.equal([])
  })
})
