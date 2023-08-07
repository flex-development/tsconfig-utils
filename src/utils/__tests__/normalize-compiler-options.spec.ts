/**
 * @file Unit Tests - normalizeCompilerOptions
 * @module tsconfig-utils/utils/tests/unit/normalizeCompilerOptions
 */

import {
  ImportsNotUsedKind,
  JsxEmit,
  ModuleDetectionKind,
  ModuleKind,
  ModuleResolutionKind,
  NewLineKind,
  ScriptTarget,
  type CompilerOptions
} from '@flex-development/tsconfig-types'
import { DOT } from '@flex-development/tutils'
import ts from 'typescript'
import LIB from '../lib'
import testSubject from '../normalize-compiler-options'

describe('unit:utils/normalizeCompilerOptions', () => {
  it('should return empty object if compilerOptions schema is invalid', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      [faker.string.sample()],
      [vi.fn()]
    ]

    // Act + Expect
    cases.forEach(([compilerOptions]) => {
      expect(testSubject(compilerOptions)).to.eql({})
    })
  })

  it('should return normalized compiler options', () => {
    // Arrange
    const compilerOptions: CompilerOptions = {
      allowJs: true,
      allowUnreachableCode: false,
      alwaysStrict: false,
      baseUrl: DOT,
      checkJs: false,
      declaration: true,
      declarationMap: true,
      emitDecoratorMetadata: true,
      esModuleInterop: true,
      exactOptionalPropertyTypes: true,
      experimentalDecorators: true,
      forceConsistentCasingInFileNames: true,
      importsNotUsedAsValues: ImportsNotUsedKind.Error,
      isolatedModules: true,
      jsx: JsxEmit.ReactJSX,
      lib: ['dom', 'dom.iterable', 'es2020'],
      module: ModuleKind.ESNext,
      moduleDetection: ModuleDetectionKind.Force,
      moduleResolution: ModuleResolutionKind.NodeNext,
      newLine: NewLineKind.LineFeed,
      noEmit: true,
      noErrorTruncation: true,
      noFallthroughCasesInSwitch: true,
      noImplicitAny: true,
      noImplicitOverride: true,
      noImplicitReturns: true,
      noUncheckedIndexedAccess: true,
      noUnusedLocals: false,
      noUnusedParameters: false,
      outDir: 'dist',
      paths: {
        '#fixtures/*': ['__fixtures__/*'],
        '#src': ['src/index'],
        '#src/*': ['src/*'],
        '#tests/*': ['__tests__/*']
      },
      preserveConstEnums: true,
      preserveSymlinks: true,
      pretty: true,
      resolveJsonModule: true,
      rootDir: '.',
      skipLibCheck: true,
      sourceMap: true,
      strict: true,
      strictNullChecks: true,
      strictPropertyInitialization: true,
      target: ScriptTarget.ESNext,
      useDefineForClassFields: true,
      useUnknownInCatchVariables: true
    }

    // Act + Expect
    expect(testSubject({ ...compilerOptions, faker })).to.eql({
      ...compilerOptions,
      importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Error,
      jsx: ts.JsxEmit.ReactJSX,
      lib: [LIB.get('dom'), LIB.get('dom.iterable'), LIB.get('es2020')],
      module: ts.ModuleKind.ESNext,
      moduleDetection: ts.ModuleDetectionKind.Force,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      newLine: ts.NewLineKind.LineFeed,
      target: ts.ScriptTarget.ESNext
    })
  })
})
