const { defineConfig } = require("cypress");
// Bundler des fichiers de tests utilisé avec cucumber (on peut bien utiliser Webpack,...)
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
// Allure 
const { allureCypress } = require("allure-cypress/reporter")


async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more.
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  // Bundler EsBuild 
  on("file:preprocessor",createBundler({plugins: [createEsbuildPlugin.default(config)],}));

  // Allure 
  allureCypress(on, {
    resultsDir: "./allure-results"
  });

  // logger to terminal 
  on('task', {
    logToTerminal(message) {
      console.log(message);
      return null;
    }
  });

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/features/*.feature",
    trashAssetsBeforeRuns: true,
    baseUrl: "https://form.jotform.com/242396167398572",
    chromeWebSecurity: false,
  },
});