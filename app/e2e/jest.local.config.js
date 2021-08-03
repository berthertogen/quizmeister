process.env.JEST_PLAYWRIGHT_CONFIG = 'jest-playwright.local.config.js'
module.exports = {
  verbose: true,
  preset: 'jest-playwright-preset',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
}