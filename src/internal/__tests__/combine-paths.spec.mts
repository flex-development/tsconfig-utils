/**
 * @file Unit Tests - combinePaths
 * @module tsconfig-utils/internal/tests/unit/combinePaths
 */

import testSubject from '#internal/combine-paths'

describe('unit:internal/combinePaths', () => {
  it.each<Parameters<typeof testSubject>>([
    ['/path', '/to', 'file.ext'],
    ['/path', 'to', 'file.ext'],
    ['c:/path', 'c:/to', 'file.ext'],
    ['c:/path', 'to', 'file.ext'],
    ['file:///path', 'file:///to', 'file.ext'],
    ['file:///path', 'to', 'file.ext'],
    ['path', 'dir', '..', 'to', 'file.ext'],
    [null, 'path', 'to', undefined, 'file.ext']
  ])('should return combined path (%#)', (path, ...paths) => {
    // Act
    const result = testSubject(path, ...paths)

    // Expect
    expect(result).to.be.a('string').with.property('length').gte(1)
    expect(result).toMatchSnapshot()
  })
})
