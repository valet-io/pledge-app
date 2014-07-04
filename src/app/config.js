'use strict';

var angular = require('angular');

var internals = {};

internals.get = function () {
  return {
    "stripe": {
      "key": "pk_test_aPKl5Ap46UFNBny2hW0k6vDi"
    },
    "firebase": {
      "endpoint": "https://valet-io-events-dev.firebaseio.com"
    },
    "valet": {
      "api": "http://api-staging.valet.io"
    }
  };
};

module.exports = angular.extend({env: process.env.NODE_ENV || 'development'}, internals.get());
