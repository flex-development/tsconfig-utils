/**
 * @file Type Aliases - List
 * @module tsconfig-utils/types/List
 */

/**
 * A list.
 *
 * @template {any} [T=unknown]
 *  The list item type
 */
type List<T = unknown> = ReadonlySet<T> | readonly T[]

export type { List as default }
