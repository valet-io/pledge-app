'use strict';

module.exports = require('angular')
  .module('Kiosk', [])
  .factory('kiosk', require('./kiosk'))
  .directive('kioskHeader', require('./header'))
  .name;
