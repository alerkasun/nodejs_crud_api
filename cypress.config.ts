const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //@ts-ignore
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});