/**
 * @file Unit Tests - readTsconfig
 * @module tsconfig-utils/lib/tests/unit/readTsconfig
 */

import isResolvedTsconfig from '#lib/is-resolved-tsconfig'
import testSubject from '#lib/read-tsconfig'
import { toUrl } from '@flex-development/mlly'
import { cwd } from '@flex-development/pathe'

describe('unit:lib/readTsconfig', () => {
  it.each<Parameters<typeof testSubject>>([
    ['@tsconfig/node10/tsconfig', { parent: toUrl('tsconfig.test.json') }],
    [new URL('node:test')]
  ])('should return `null` if tsconfig is not found (%j)', async (
    id,
    options
  ) => {
    expect(await testSubject(id, options)).to.be.null
  })

  it.each<Parameters<typeof testSubject>>([
    ['#fixtures/tsconfig.json', { parent: import.meta.url }],
    ['@tsconfig/strictest/tsconfig.json'],
    ['__fixtures__/tsconfig.empty', { cwd: cwd() }]
  ])('should return resolved tsconfig object (%j)', async (
    id,
    options
  ) => {
    // Act
    const result = await testSubject(id, options)

    // Expect
    expect(result).to.satisfy(isResolvedTsconfig)
    expect(result).toMatchSnapshot()
  })
})
