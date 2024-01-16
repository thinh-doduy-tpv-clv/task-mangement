/* eslint @typescript-eslint/no-var-requires: "off" */
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    // baseUrl: "https://demo.guru99.com/test/newtours",
    baseUrl: "http://localhost:3000",
    //
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    // pageLoadTimeout: 4000,
    video: false,
    chromeWebSecurity: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    screenshotOnRunFailure: true,
    // trashAssetsBeforeRuns: true,
    //Report config
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      charts: true,
      reportPageTitle: "Test Report",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      // saveJson: true,
    },
  },
});
