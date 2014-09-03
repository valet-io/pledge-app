'use strict';

var launchers = {
  sl_ios_safari_7_1: {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.9',
    version: '7.1',
  },
  sl_ios_safari_6_1: {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.8',
    version: '6.1',
  },
  sl_android_4_3: {
    base: 'SauceLabs',
    browserName: 'android',
    platform: 'Linux',
    version: '4.3',
  },
  sl_android_4_2: {
    base: 'SauceLabs',
    browserName: 'android',
    platform: 'Linux',
    version: '4.2',
  }
};

exports.reporters = ['dots', 'saucelabs'];

exports.sauceLabs = {
  testName: 'Pledge App Unit Tests',
  startConnect: false,
  recordScreenshots: false,
  tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
};

exports.transports = ['xhr-polling'];

exports.captureTimeout = 0;
exports.browserNoActivityTimeout = 120000;

exports.customLaunchers = launchers;
exports.browsers = Object.keys(launchers);
