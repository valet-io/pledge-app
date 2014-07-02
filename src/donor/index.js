'use strict';

require('ng-base-model');

require('angular')
  .module('DonorModule', [
    'valet-base-model',
  ])
  .factory('Donor', [
    'BaseModel',
    require('./model')
  ]);

module.exports = 'DonorModule';
