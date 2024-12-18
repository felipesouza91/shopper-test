
import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};

export default config;
