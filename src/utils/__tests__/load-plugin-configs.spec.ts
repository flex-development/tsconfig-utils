/**
 * @file Unit Tests - loadPluginConfigs
 * @module tsconfig-utils/utils/tests/unit/loadPluginConfigs
 */

import type { Spy } from '#tests/interfaces'
import type { Plugin } from '@flex-development/tsconfig-types'
import loadCompilerOptions from '../load-compiler-options'
import testSubject from '../load-plugin-configs'

vi.mock('../load-compiler-options')

describe('unit:utils/loadPluginConfigs', () => {
  let id: string
  let loadCompilerOptionsMock: Spy<typeof loadCompilerOptions>

  beforeAll(() => {
    id = 'tsconfig.json'
    loadCompilerOptionsMock =
      loadCompilerOptions as unknown as typeof loadCompilerOptionsMock
  })

  it('should return Plugin object array', () => {
    // Arrange
    const plugins: Plugin[] = [{ name: 'typescript-styled-plugin' }]
    loadCompilerOptionsMock.mockReturnValueOnce({ plugins })

    // Act + Expect
    expect(testSubject(id)).to.deep.equal(plugins)
  })

  it('should return empty array if compilerOptions.plugins is NIL', () => {
    // Arrange
    loadCompilerOptionsMock.mockReturnValueOnce({})

    // Act + Expect
    expect(testSubject(id)).to.deep.equal([])
  })
})
