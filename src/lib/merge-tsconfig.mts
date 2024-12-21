/**
 * @file mergeTsconfig
 * @module tsconfig-utils/lib/mergeTsconfig
 */

import getTsconfig from '#internal/get-tsconfig'
import type {
  JsonValue,
  Tsconfig,
  TsconfigHost
} from '@flex-development/tsconfig-utils'
import { isObjectCurly, properties } from '@flex-development/tutils'

/**
 * Merge one or more tsconfig objects into a single {@linkcode Tsconfig}.
 *
 * Tsconfig source objects are applied from left to right. Subsequent sources
 * overwrite property assignments of previous sources.
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
 *  Target tsconfig or tsconfig host
 * @param {ReadonlyArray<Tsconfig | TsconfigHost | null | undefined>} tsconfigs
 *  Source tsconfig object(s)
 * @return {Tsconfig}
 *  Merged tsconfig
 */
function mergeTsconfig(
  this: void,
  target: Tsconfig | TsconfigHost | null | undefined,
  ...tsconfigs: readonly (Tsconfig | TsconfigHost | null | undefined)[]
): Tsconfig {
  return tsconfigs.reduce<Tsconfig>((acc, tsconfig) => {
    return properties(tsconfig = getTsconfig(tsconfig)).reduce((
      target,
      property
    ) => {
      /**
       * Merge value.
       *
       * @var {JsonValue | undefined} value
       */
      let value: JsonValue | undefined = tsconfig[property]

      if (Object.prototype.hasOwnProperty.call(target, property)) {
        /**
         * Target object value.
         *
         * @const {JsonValue} targetValue
         */
        const targetValue: JsonValue = target[property] as JsonValue

        /**
         * Source object value.
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

export default mergeTsconfig
