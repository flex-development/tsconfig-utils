/**
 * @file Unit Tests - withTrailingSlash
 * @module tsconfig-utils/internal/tests/unit/withTrailingSlash
 */

import testSubject from '#internal/with-trailing-slash'
import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import { equal } from 'devlop'

describe('unit:internal/withTrailingSlash', () => {
  let url: URL

  beforeAll(() => {
    url = mlly.cwd()
    url.href += pathe.sep
    equal(url.href.slice(-2), pathe.sep.repeat(2), 'expected `2` slashes')
  })

  it('should return `value` with one trailing slash', () => {
    // Act
    const result = testSubject(url)

    // Expect
    expect(result).to.eq(url)
    expect({ href: result.href, pathname: result.pathname }).toMatchSnapshot()
  })
})
