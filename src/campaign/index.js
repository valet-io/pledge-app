'use strict';

require('ng-base-model');

require('angular')
  .module('CampaignModule', [
    'ui.router',
    'valet-base-model',
    'firebase',
    'config'
  ])
  .factory('Campaign', [
    'BaseModel',
    '$firebase',
    '$q',
    'config',
    require('./model')
  ])
  .config([
    '$stateProvider',
    require('./routes')
  ]);

module.exports = 'CampaignModule';
