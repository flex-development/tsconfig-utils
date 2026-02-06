/**
 * @file eslint
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

import fldv from '@flex-development/eslint-config'

/**
 * eslint configuration.
 *
 * @type {import('eslint').Linter.Config[]}
 * @const config
 */
const config = [
  ...fldv.configs.node,
  {
    ignores: ['__fixtures__/tsconfigs/tsconfig.empty.json']
  },
  {
    files: ['src/internal/__tests__/is-promise.spec.mts'],
    rules: {
      'unicorn/no-thenable': 0
    }
  },
  {
    files: [
      'src/internal/chain-or-call.mts',
      'src/internal/get-file-system-entries.mts',
      'src/internal/visit-directory.mts',
      'src/lib/load-tsconfig.mts',
      'src/lib/read-tsconfig.mts'
    ],
    rules: {
      'promise/prefer-await-to-then': 0
    }
  },
  {
    files: [
      'src/internal/get-file-system-entries.mts',
      'src/internal/match-files.mts',
      'src/lib/load-tsconfig.mts'
    ],
    rules: {
      '@typescript-eslint/promise-function-async': 0
    }
  }
]

export default config
