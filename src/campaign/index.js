'use strict';

require('ng-base-model');

require('angular')
  .module('CampaignModule', [
    'ui.router',
    'valet-base-model',
  ])
  .factory('Campaign', require('./CampaignModel'))
  .config([
    '$stateProvider',
    require('./routes')
  ]);

module.exports = 'CampaignModule';
