module.exports = {
  frameworks: ['browserify', 'mocha', 'chai-sinon', 'env'],
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
    transform: ['browserify-istanbul', 'browserify-shim']
  },
  coverageReporter: {
    reporters: [
      {type: 'html'},
      {type: 'text-summary'}
    ]
  },
  client: {
    env: {
      firebase__endpoint: 'https://valet-io-events-dev.firebaseio.com',
      valet__api: 'http://valet-io-pledge-dev.herokuapp.com'
    }
  },
  browsers: process.env.CI ? ['Firefox'] : ['PhantomJS'],
  singleRun: !!process.env.CI
};
