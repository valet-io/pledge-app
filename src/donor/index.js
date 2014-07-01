'use strict';

require('ng-base-model');

require('angular')
  .module('DonorModule', [
    'valet-base-model',
  ])
  .factory('Donor', require('./model'));

module.exports = 'DonorModule';
