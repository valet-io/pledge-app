'use strict';

require('ng-base-model');

require('angular')
  .module('campaignModule', [
    'valet-base-model'
  ])
  .factory('Campaign', require('./campaign-model'));