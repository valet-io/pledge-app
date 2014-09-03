'use strict';

exports.config = {
  specs: ['test/e2e/**/*.js'],
  baseUrl: 'http://localhost:8000',
  capabilities: {
    browserName: 'firefox'
  },
  framework: 'mocha'
};
