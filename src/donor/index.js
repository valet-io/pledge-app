'use strict';

require('ng-base-model');

require('angular')
  .module('DonorModule', [
    'valet-base-model',
  ])
  .factory('Donor', require('./DonorModel'));

module.exports = 'DonorModule';