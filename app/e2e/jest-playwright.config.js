// https://github.com/playwright-community/jest-playwright/#configuration
module.exports = {
  browsers: ["chromium"],
  launchOptions: {
    headless: true
  },
  serverOptions: {
    command: 'npm run start:admin',
    launchTimeout: 120000,
    host: 'localhost',
    port: 4200,
    usedPortAction: 'kill',
  },
}