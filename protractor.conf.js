exports.config = {
  specs: ['test/e2e/**/*.js'],
  capabilities: {
    browserName: 'phantomjs'
  },
  framework: 'mocha'
};
