/**
 * @file Mock Utilities - loadTsconfig
 * @module mlly/utils/mocks/loadTsconfig
 */

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
