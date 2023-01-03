const {defineConfig} = require("cypress");
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/dist/plugin');


module.exports = defineConfig({
    e2e: {
        "chromeWebSecurity": true,
        "video": false,
        "modifyObstructiveCode": false,
        "unhandledRejections": false,
        "viewportWidth": 1320,
        "viewportHeight": 800,
        "reporter": "mocha-allure-reporter",
        "defaultCommandTimeout": 10000,
        "pageLoadTimeout": 60000,
        baseUrl: 'https://demoqa.com/',
        blockHosts: [
            "*match.adsrvr.org",
            "*google-analytics.com",
            "*pagead2.googlesyndication.com",
            "*securepubads.g.doubleclick.net",
            "*api.rlcdn.com"
        ],
        setupNodeEvents(on, config) {
            getCompareSnapshotsPlugin(on, config);
        },
    },

});
