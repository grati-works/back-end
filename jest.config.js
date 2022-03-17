/* eslint-disable */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  restoreMocks: true,
  // collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  watchPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: ["/node_modules/"],
  collectCoverageFrom: ["src/modules/**/useCases/**/**/*.ts", "src/modules/**/useCases/**/*.ts"],
};
