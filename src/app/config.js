'use strict';

var angular = require('angular');

var internals = {};

internals.get = function () {
  switch (process.env.NODE_ENV) {
    case 'development': return require('../../environments/development.json');
    case 'staging': return require('../../environments/staging.json');
    case 'production': return require('../../environments/production.json');
    default: return require('../../environments/development.json');
  }
};

module.exports = angular.extend({env: process.env.NODE_ENV || 'development'}, internals.get());
