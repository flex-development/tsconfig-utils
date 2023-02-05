/**
 * @file Mock Utilities - loadTsconfig
 * @module mlly/utils/mocks/loadTsconfig
 * @see https://github.com/microsoft/TypeScript/issues/47663
 */

import type {} from '@flex-development/tutils/dist/types/nullable.mjs'

/**
 * `loadTsconfig` module type.
 */
type Actual = typeof import('../load-tsconfig')

/**
 * `loadTsconfig` module.
 *
 * @const {Actual} actual
 */
const actual: Actual = await vi.importActual<Actual>('../load-tsconfig')

export default vi.fn(actual.default)
