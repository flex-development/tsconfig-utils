/**
 * @file Unit Tests - readFile
 * @module tsconfig-utils/internal/tests/unit/readFile
 */

import pathe from '@flex-development/pathe'
import fs from 'node:fs'
import { URL, pathToFileURL } from 'node:url'
import testSubject from '../read-file'

describe('unit:internal/readFile', () => {
  it('should return file content', () => {
    // Arrange
    const id: URL = new URL('tsconfig.json', pathToFileURL('.' + pathe.sep))

    // Act + Expect
    expect(testSubject(id)).to.equal(fs.readFileSync(id, 'utf8'))
  })
})
