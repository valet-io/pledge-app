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
  .controller('CampaignController', [
    '$scope',
    'campaign',
    '$timeout',
    require('./controller')
  ])
  .config([
    '$stateProvider',
    require('./routes')
  ]);

module.exports = 'CampaignModule';
