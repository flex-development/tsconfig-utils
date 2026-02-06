/**
 * @file Unit Tests - createGetCanonicalFileName
 * @module tsconfig-utils/lib/tests/unit/createGetCanonicalFileName
 */

import constant from '#internal/constant'
import testSubject from '#lib/create-get-canonical-file-name'
import pathe from '@flex-development/pathe'
import type { GetCanonicalFileName } from '@flex-development/tsconfig-utils'

describe('unit:lib/createGetCanonicalFileName', () => {
  describe.each<[
    ...Parameters<typeof testSubject>,
    ...Parameters<GetCanonicalFileName>
  ]>([
    [null, '/lib/components/atoms/Anchor.tsx'],
    [true, '/lib/components/atoms/Button.tsx'],
    [
      vi.fn(constant(false)).mockName('noCaseSensitiveFileNames'),
      pathe.pathToFileURL('/lib/components/atoms/Header.tsx')
    ],
    [
      vi.fn(constant(true)).mockName('useCaseSensitiveFileNames'),
      pathe.pathToFileURL('/lib/components/atoms/Footer.tsx')
    ]
  ])('%#', (useCaseSensitiveFileNames, id) => {
    it('should return canonical file name for `id`', () => {
      expect(testSubject(useCaseSensitiveFileNames)(id)).toMatchSnapshot()
    })
  })
})
