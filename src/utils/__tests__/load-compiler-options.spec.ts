/**
 * @file Unit Tests - loadCompilerOptions
 * @module tsconfig-utils/utils/tests/unit/loadCompilerOptions
 */

import type { Spy } from '#tests/interfaces'
import getTsconfigJson from '#tests/utils/get-tsconfig-json'
import testSubject from '../load-compiler-options'
import loadTsconfig from '../load-tsconfig'

vi.mock('../load-tsconfig')

describe('unit:utils/loadCompilerOptions', () => {
  let loadTsconfigMock: Spy<typeof loadTsconfig>
  let tsconfig: string

  beforeAll(() => {
    loadTsconfigMock = loadTsconfig as unknown as typeof loadTsconfigMock
    tsconfig = 'tsconfig.json'
  })

  it('should return CompilerOptions object', () => {
    // Arrange
    const { compilerOptions } = getTsconfigJson(tsconfig)

    // Act + Expect
    expect(testSubject(tsconfig)).to.deep.equal(compilerOptions)
  })

  it('should return empty object if compilerOptions is NIL', () => {
    // Arrange
    loadTsconfigMock.mockReturnValueOnce({})

    // Act + Expect
    expect(testSubject(tsconfig)).to.deep.equal({})
  })

  it('should return empty object if tsconfig file does not exist', () => {
    expect(testSubject('__fixtures__/tsconfig.dev.json')).to.deep.equal({})
  })

  it('should return empty object if tsconfig file is empty', () => {
    expect(testSubject('__fixtures__/tsconfig.empty.json')).to.deep.equal({})
  })
})
