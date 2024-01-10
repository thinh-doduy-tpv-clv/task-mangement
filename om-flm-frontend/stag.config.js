import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //replace with staging url
    baseUrl: "http://localhost:3000",
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 10000,
    video: false,
    chromeWebSecurity: true,
    screenshotOnRunFailure: true,

    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});
