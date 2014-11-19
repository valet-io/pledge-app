var CI = process.env.CI;
module.exports = {
  frameworks: ['browserify', 'mocha', 'env'],
  files: [
    'node_modules/angular/angular.js',
    'node_modules/angular-messages/angular-messages.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'components/stripe/index.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js',
    'test/unit/index.js'
  ],
  preprocessors: {
    'test/unit/**/*.js': ['browserify']
  },
  reporters: CI ? ['mocha', 'coverage'] : ['mocha'],
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
