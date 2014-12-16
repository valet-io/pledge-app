'use strict';

module.exports = require('angular')
  .module('Live', [])
  .factory('live', require('./live'))
  .directive('testBadge', require('./badge'))
  .name;
