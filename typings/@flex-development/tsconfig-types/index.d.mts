declare module '@flex-development/tsconfig-types' {
  interface JsonObject {
    [key: symbol]: JsonValue
  }
}

export {}
