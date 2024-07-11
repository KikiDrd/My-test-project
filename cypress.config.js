const { defineConfig } = require('cypress')
const { initPlugin } = require('./cypress/plugins/index.js')

module.exports = defineConfig({
  projectId: 'vr49gh',
  chromeWebSecurity: false,
  watchForFileChanges: false,
  pageLoadTimeout: 90000,
  defaultCommandTimeout: 10000,
  responseTimeout: 10000,
  viewportWidth: 1920,
  viewportHeight: 1066,
  numTestsKeptInMemory: 0,
  blockHosts: ['*cdn-ml.net', '*mlcdn.eu', '*mailocator.com'],

  e2e: {
    baseUrl: 'https://testing-url.example.com',
    specPattern: 'cypress/integration/**/*.js',
    supportFile: 'cypress/support/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: '*.ignore.js',
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      return initPlugin(on, config)
    },
  },

  env: {
    firstname: 'Test',
    lastname: 'Tester',
    streetAddress: 'streetAdress',
    login: 'email',
    password: 'password',
    passwordChange: 'passwordChange',
    postalCode: 'postalCode',
    phoneNumber: 'phoneNumber',
    numberOfOrders: 'numberOfCreatedOrders',
    randomNumber: Math.floor(Math.random() * 100000) + 1,
    randomString: function getRandomString() {
      return Math.random()
        .toString(36)
        .substring(2, Math.floor(Math.random() * 9) + 2)
    },
    // generate current date time for tracking in testing
    actualTimeString: new Date()
      .toLocaleString('cz', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      .split(/\D/g)
      .join(''),
    develop: true, // login only on develop environment
    auth: {
      username: 'username',
      password: 'password',
    },
  },
})
