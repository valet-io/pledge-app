'use strict';

require('ng-base-model');
require('angular-local-storage');

require('angular')
  .module('CampaignModule', [
    'valet-base-model',
    'LocalStorageModule'
  ])
  .factory('Campaign', require('./CampaignModel'));

module.exports = 'CampaignModule';