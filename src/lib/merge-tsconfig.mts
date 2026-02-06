/**
 * @file mergeTsconfig
 * @module tsconfig-utils/lib/mergeTsconfig
 */

import getTsconfig from '#internal/get-tsconfig'
import type { Tsconfig } from '@flex-development/tsconfig-types'
import type { JsonValue, TsconfigHost } from '@flex-development/tsconfig-utils'
import { isObjectCurly, properties } from '@flex-development/tutils'

export default mergeTsconfig

/**
 * Merge one or more tsconfig objects into a single {@linkcode Tsconfig}.
 *
 * Tsconfig source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * > 👉 **Note**: If `target` is a {@linkcode TsconfigHost}, `target.tsconfig`
 * > will be modified. Otherwise, `target` will be modified.
 *
 * @see {@linkcode TsconfigHost}
 * @see {@linkcode Tsconfig}
 *
 * @template {Tsconfig} T
 *  The merged tsconfig
 *
 * @this {void}
 *
 * @param {Tsconfig | TsconfigHost | null | undefined} target
 *  The target tsconfig or tsconfig host
 * @param {ReadonlyArray<Tsconfig | TsconfigHost | null | undefined>} tsconfigs
 *  The source tsconfig object(s)
 * @return {T}
 *  The merged tsconfig
 */
function mergeTsconfig<T extends Tsconfig>(
  this: void,
  target: Tsconfig | TsconfigHost | null | undefined,
  ...tsconfigs: readonly (Tsconfig | TsconfigHost | null | undefined)[]
): T

/**
 * Merge one or more tsconfig objects into a single {@linkcode Tsconfig}.
 *
 * Tsconfig source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * > 👉 **Note**: If `target` is a {@linkcode TsconfigHost}, `target.tsconfig`
 * > will be modified. Otherwise, `target` will be modified.
 *
 * @see {@linkcode TsconfigHost}
 * @see {@linkcode Tsconfig}
 *
 * @this {void}
 *
 * @param {Tsconfig | TsconfigHost | null | undefined} target
 *  The target tsconfig or tsconfig host
 * @param {ReadonlyArray<Tsconfig | TsconfigHost | null | undefined>} tsconfigs
 *  The source tsconfig object(s)
 * @return {Tsconfig}
 *  The merged tsconfig
 */
function mergeTsconfig(
  this: void,
  target: Tsconfig | TsconfigHost | null | undefined,
  ...tsconfigs: readonly (Tsconfig | TsconfigHost | null | undefined)[]
): Tsconfig {
  return tsconfigs.reduce<Tsconfig>((acc, tsconfig) => {
    tsconfig = getTsconfig(tsconfig)
    return properties(tsconfig).reduce((target, property) => {
      /**
       * The value to merge.
       *
       * @var {JsonValue | undefined} value
       */
      let value: JsonValue | undefined = tsconfig[property]

      if (Object.prototype.hasOwnProperty.call(target, property)) {
        /**
         * The target object value.
         *
         * @const {JsonValue} targetValue
         */
        const targetValue: JsonValue = target[property] as JsonValue

        /**
         * The source object value.
         *
         * @const {JsonValue} sourceValue
         */
        const sourceValue: JsonValue = tsconfig[property] as JsonValue

        if (isObjectCurly(targetValue) && isObjectCurly(sourceValue)) {
          value = { ...targetValue, ...sourceValue }
        }
      }

      return Object.assign(target, { [property]: value }), target
    }, acc)
  }, getTsconfig(target))
}
