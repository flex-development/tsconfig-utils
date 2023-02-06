/**
 * @file Internal - getPropertyValue
 * @module tsconfig-utils/internal/getPropertyValue
 */

import type { Nilable, ObjectUnknown } from '@flex-development/tutils'

/**
 * Extracts a property value from the given `object`.
 *
 * Returns `undefined` if the given `property` is not defined.
 *
 * **Note**: If `object` is `null` or `undefined`, it will be converted to an
 * empty object first.
 *
 * @template T - Object type
 * @template K - Object property name
 *
 * @param {Nilable<T>} object - Object to evaluate, `null`, or `undefined`
 * @param {string} property - Object property name
 * @return {T[K] | undefined} Property value or `undefined`
 */
function getPropertyValue<T extends ObjectUnknown, K extends string = string>(
  object: Nilable<T>,
  property: K
): T[K] | undefined {
  return Object.getOwnPropertyDescriptor(object ?? {}, property)?.value as T[K]
}

export default getPropertyValue
