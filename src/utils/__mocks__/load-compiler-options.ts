/**
 * @file Mock Utilities - loadCompilerOptions
 * @module mlly/utils/mocks/loadCompilerOptions
 */

/**
 * `loadCompilerOptions` module type.
 */
type Actual = typeof import('../load-compiler-options')

/**
 * `loadCompilerOptions` module.
 *
 * @const {Actual} actual
 */
const actual: Actual = await vi.importActual<Actual>('../load-compiler-options')

export default vi.fn(actual.default)
