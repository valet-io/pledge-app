'use strict';

var ci = process.env.CI;

exports.config = {
  specs: ['test/e2e/*.js'],
  baseUrl: 'http://localhost:8000',
  capabilities: {
    browserName: ci ? 'firefox' : 'chrome'
  },
  chromeOnly: !ci,
  framework: 'mocha'
};
