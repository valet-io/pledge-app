'use strict';

var env = require('env');

module.exports = {
  stripe: {
    key: env.stripe__key,
    test_key: env.stripe__test__key
  },
  firebase: {
    endpoint: env.firebase__endpoint
  },
  valet: {
    api: env.valet__api
  }
};
/* istanbul ignore next */
if (env.sentry__dsn) {
  module.exports.sentry = {
    dsn: env.sentry__dsn
  };
} 
