'use strict';

var env = require('env');

module.exports = {
  stripe: {
    key: env.stripe__key
  },
  firebase: {
    endpoint: env.firebase__endpoint
  },
  valet: {
    api: env.valet__api
  }
};

if (env.sentry__dsn) {
  module.exports.sentry = {
    dsn: sentry__dsn
  };
} 
