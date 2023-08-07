/**
 * @file Test Setup - chai
 * @module tests/setup/chai
 * @see https://chaijs.com
 */

import { JestExtend as extend } from '@vitest/expect'
import { chai } from 'vitest'

/**
 * initialize chai plugins.
 */
extend(chai, chai.util)
