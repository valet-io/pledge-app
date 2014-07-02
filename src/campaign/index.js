'use strict';

require('ng-base-model');

require('angular')
  .module('CampaignModule', [
    'ui.router',
    'valet-base-model',
  ])
  .factory('Campaign', [
    'BaseModel',
    require('./model')
  ])
  .config([
    '$stateProvider',
    require('./routes')
  ]);

module.exports = 'CampaignModule';
