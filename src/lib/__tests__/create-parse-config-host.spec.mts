/**
 * @file Unit Tests - createParseConfigHost
 * @module tsconfig-utils/lib/tests/unit/createParseConfigHost
 */

import fs from '#internal/fs'
import testSubject from '#lib/create-parse-config-host'
import * as mlly from '@flex-development/mlly'
import type { ParseConfigHost } from '@flex-development/tsconfig-utils'
import { alphabetize, constant, identity } from '@flex-development/tutils'
import ts from 'typescript'
import tsconfig from '../../../tsconfig.json' with { type: 'json' }

describe('unit:lib/createParseConfigHost', () => {
  describe.each<Parameters<typeof testSubject>>([
    [],
    [{ fs, useCaseSensitiveFileNames: constant(false) }]
  ])('host (%#)', options => {
    let subject: ParseConfigHost

    beforeAll(() => {
      subject = testSubject(options)
    })

    describe('readDirectory', () => {
      it.each<Parameters<ParseConfigHost['readDirectory']>>([
        [
          new URL('src', mlly.cwd()),
          ['.cjs', '.cts', '.js', '.json', '.mjs', '.mts', '.ts'],
          tsconfig.exclude,
          tsconfig.include,
          0
        ],
        [
          mlly.cwd(),
          ['.cjs', '.cts', '.js', '.json', '.mjs', '.mts', '.ts'],
          tsconfig.exclude,
          tsconfig.include
        ],
        [
          mlly.cwd(),
          ['.mjs', '.mts', '.ts'],
          tsconfig.exclude,
          tsconfig.include,
          1
        ]
      ])('should return list of files under directory at `id` (%#)', (
        id,
        extensions,
        exclude,
        include,
        depth
      ) => {
        // Arrange
        const expected: readonly string[] = alphabetize(ts.sys.readDirectory(
          fs.realpath(id),
          extensions ? [...extensions] : undefined,
          exclude ? [...exclude] : undefined,
          include ? [...include] : undefined,
          depth ?? undefined
        ), identity)

        // Act
        const result = subject.readDirectory(
          id,
          extensions,
          exclude,
          include,
          depth
        )

        // Expect
        expect(result).to.be.an('array').and.be.frozen.and.eql(expected)
      })
    })
  })
})
