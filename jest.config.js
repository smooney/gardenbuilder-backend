module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 40,
      statements: 40
    }
  },
  coverageReporters: ['json', 'lcov'],
}
