module.exports = function (config) {
  var customLaunchers = {
    sl_ios_safari_7_1: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.9',
      version: '7.1',
    },
    sl_android_4_3: {
      base: 'SauceLabs',
      browserName: 'android',
      platform: 'Linux',
      version: '4.3',
    }
  };

  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['browserify', 'mocha', 'chai-sinon'],

    // list of files / patterns to load in the browser
    files: [
      'components/angular/angular.js',
      'components/angular-mocks/angular-mocks.js',
      'components/stripe/index.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'test/unit/**/*.js'
    ],

    preprocessors: {
      'test/unit/**/*.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: ['browserify-shim', 'envify']
    },

    // list of files / patterns to exclude
    exclude: [],

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    reporters: ['dots', 'saucelabs'],

    sauceLabs: {
      testName: 'Pledge App Unit Tests',
      startConnect: false,
      recordScreenshots: false
    },

    transports: ['xhr-polling'],

    captureTimeout: 0,
    browserNoActivityTimeout: 120000,

    // enable / disable watching file and executing tests whenever any file changes

    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
