/**
 * @file Fixtures - tsconfigStrictest
 * @module fixtures/tsconfigStrictest
 */

import type { Tsconfig } from '@flex-development/tsconfig-types'

/**
 * The strictest TypeScript configuration.
 *
 * @see {@linkcode Tsconfig}
 *
 * @type {Tsconfig}
 */
const tsconfig: Tsconfig = {
  $schema: 'https://www.schemastore.org/tsconfig',
  _version: '2.0.0',
  compilerOptions: {
    allowUnreachableCode: false,
    allowUnusedLabels: false,
    esModuleInterop: true,
    exactOptionalPropertyTypes: true,
    isolatedModules: true,
    noFallthroughCasesInSwitch: true,
    noImplicitOverride: true,
    noImplicitReturns: true,
    noPropertyAccessFromIndexSignature: true,
    noUncheckedIndexedAccess: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    skipLibCheck: true,
    strict: true
  }
}

export default tsconfig
