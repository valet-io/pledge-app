exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  specs: ['test/e2e/**/*.js'],
  multiCapabilities: [
    {
      browserName: 'chrome'
    }
  ],
  framework: 'mocha'
};
