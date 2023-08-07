/**
 * @file Test Utilities - getTsconfigJson
 * @module tests/utils/getTsconfigJson
 */

import type { TSConfig } from '@flex-development/tsconfig-types'
import { cast } from '@flex-development/tutils'
import fs from 'node:fs'
import type { URL } from 'node:url'

/**
 * Retrieves a tsconfig object.
 *
 * @param {URL | string} id - Module id of tsconfig file
 * @return {TSConfig} `TSConfig` object
 */
const getTsconfigJson = (id: URL | string): TSConfig => {
  return cast(JSON.parse(fs.readFileSync(id, 'utf8')))
}

export default getTsconfigJson
