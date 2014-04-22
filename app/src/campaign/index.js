'use strict';

require('ng-base-model');
require('angular-local-storage');

require('angular')
  .module('campaignModule', [
    'valet-base-model',
    'LocalStorageModule'
  ])
  .factory('Campaign', require('./CampaignModel'));