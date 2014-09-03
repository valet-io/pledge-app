'use strict';

var _ = require('lodash');

exports.config = _.extend({}, require('./protractor.conf').config, {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  multiCapabilities: [
    {
      platformName: 'iOS',
      platformVersion: '7.1',
      browserName: 'Safari',
      deviceName: 'iPhone Simulator',
      
    }
  ]
  .map(function (capability) {
    return _.extend(capability, {
      build: process.env.TRAVIS_JOB_NUMBER,
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      name: 'Pledge App E2E Tests',
      'appium-version': '1.2.1'
    });
  })
});
