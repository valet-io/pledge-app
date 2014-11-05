var CI = process.env.CI;
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
  reporters: CI ? ['progress', 'coverage'] : ['progress'],
  browserify: {
    debug: true,
    transform: CI ? ['browserify-istanbul', 'browserify-shim'] : ['browserify-shim']
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
  browsers: CI ? ['Firefox'] : ['PhantomJS'],
  singleRun: !!CI
};
