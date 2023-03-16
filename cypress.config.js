const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.heycater.com/en',
    reporter: 'spec',
    // enables retry ability on failing tests
    retries: { openMode: 1, runMode: 1 },
    watchForFileChanges: true,
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) { },
  },
});
