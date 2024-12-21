/**
 * @file Unit Tests - loadTsconfig
 * @module tsconfig-utils/lib/tests/unit/loadTsconfig
 */

import isResolvedTsconfig from '#lib/is-resolved-tsconfig'
import testSubject from '#lib/load-tsconfig'
import type { ModuleId } from '@flex-development/mlly'
import type { LoadTsconfigOptions } from '@flex-development/tsconfig-utils'

describe('unit:lib/loadTsconfig', () => {
  it('should return `null` if tsconfig is not found', async () => {
    expect(await testSubject('@tsconfig/node10/tsconfig.json')).to.be.null
  })

  it('should return resolved tsconfig object', async () => {
    // Arrange
    const id: ModuleId = '#fixtures/tsconfig.json'
    const options: LoadTsconfigOptions = { parent: import.meta.url }

    // Act
    const result = await testSubject(id, options)

    // Expect
    expect(result).to.satisfy(isResolvedTsconfig)
    expect(result).toMatchSnapshot()
  })
})
