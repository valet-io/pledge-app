'use strict';

var angular = require('angular');

module.exports = function () {
  var env = process.env.NODE_ENV || 'development';
  return angular.extend({env: env}, require('../../../environments/' + env + '.json'));
};
