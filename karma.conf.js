module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['browserify', 'mocha', 'chai-sinon', 'env'],

    // list of files / patterns to load in the browser
    files: [
      'components/angular/angular.js',
      'components/angular-messages/angular-messages.js',
      'components/angular-mocks/angular-mocks.js',
      'components/stripe/index.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      './components/firebase/firebase.js',
      './components/angularfire/angularfire.js',
      'test/unit/**/*.js'
    ],

    preprocessors: {
      'test/unit/**/*.js': ['browserify']
    },

    reporters: ['progress', 'coverage'],

    browserify: {
      debug: true,
      transform: ['browserify-shim', 'envify', 'browserify-istanbul']
    },

    coverageReporter: {
      reporters: [
        {type: 'html'},
        {type: 'text-summary'}
      ]
    },

    client: {
      env: require('./environments/development.json')
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};