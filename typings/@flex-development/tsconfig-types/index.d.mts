import type {} from '@flex-development/pkg-types'
import type {} from '@flex-development/tsconfig-types'

declare module '@flex-development/tsconfig-types' {
  interface JsonObject {
    [key: symbol]: JsonValue
  }
}
