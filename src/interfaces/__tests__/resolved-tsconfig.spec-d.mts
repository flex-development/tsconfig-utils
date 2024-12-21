/**
 * @file Type Tests - ResolvedTsconfig
 * @module tsconfig-utils/interfaces/tests/unit-d/ResolvedTsconfig
 */

import type TestSubject from '#interfaces/resolved-tsconfig'
import type { TsconfigHost } from '@flex-development/tsconfig-utils'

describe('unit-d:interfaces/ResolvedTsconfig', () => {
  it('should extend TsconfigHost', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<TsconfigHost>()
  })

  it('should match [url: URL]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('url').toEqualTypeOf<URL>()
  })
})
