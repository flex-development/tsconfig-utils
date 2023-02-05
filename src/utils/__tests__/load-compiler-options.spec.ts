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
  let id: string
  let loadTsconfigMock: Spy<typeof loadTsconfig>

  beforeAll(() => {
    id = 'tsconfig.json'
    loadTsconfigMock = loadTsconfig as unknown as typeof loadTsconfigMock
  })

  it('should return CompilerOptions object', () => {
    expect(testSubject(id)).to.deep.equal(getTsconfigJson(id)!.compilerOptions)
  })

  it('should return empty object if compilerOptions is NIL', () => {
    // Arrange
    loadTsconfigMock.mockReturnValueOnce({})

    // Act + Expect
    expect(testSubject(id)).to.deep.equal({})
  })

  it('should return empty object if tsconfig file does not exist', () => {
    expect(testSubject('__fixtures__/tsconfig.dev.json')).to.deep.equal({})
  })

  it('should return empty object if tsconfig file is empty', () => {
    expect(testSubject('__fixtures__/tsconfig.empty.json')).to.deep.equal({})
  })
})
