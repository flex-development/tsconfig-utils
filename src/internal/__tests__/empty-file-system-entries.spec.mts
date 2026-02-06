/**
 * @file Unit Tests - emptyFileSystemEntries
 * @module tsconfig-utils/internal/tests/unit/emptyFSEntries
 */

import emptyArray from '#internal/empty-array'
import testSubject from '#internal/empty-file-system-entries'
import { isObjectPlain } from '@flex-development/tutils'

describe('unit:internal/emptyFileSystemEntries', () => {
  it('should be empty readonly file system entries record', () => {
    expect(testSubject).to.be.frozen.and.satisfy(isObjectPlain)
    expect(testSubject).to.have.keys(['directories', 'files'])
    expect(testSubject.directories).to.be.frozen.and.eq(emptyArray)
    expect(testSubject.files).to.be.frozen.and.eq(emptyArray)
  })
})
