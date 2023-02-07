/**
 * @file Unit Tests - resolvePaths
 * @module tsconfig-utils/utils/tests/unit/resolvePaths
 */

import * as mlly from '@flex-development/mlly'
import { dedent } from 'ts-dedent'
import testSubject from '../resolve-paths'

describe('unit:utils/resolvePaths', () => {
  it('should return code with path aliases resolved', async () => {
    // Arrange
    const code: string = dedent`
      import type { ResolvePathsOptions } from '#src/interfaces'
      import * as internal from '#src/internal'
      import * as mlly from '@flex-development/mlly'
      import type { CompilerOptions } from '@flex-development/tsconfig-types'
      import loadCompilerOptions from './load-compiler-options'
    `

    // Act
    const result = await testSubject(code, {
      ext: '',
      parent: mlly.toURL('src/utils/resolve-paths.ts')
    })

    // Expect
    expect(result).toMatchSnapshot()
  })
})
