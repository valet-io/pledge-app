'use strict';

require('angular')
  .module('CampaignModule', [
    'ui.router',
    'firebase',
    'convex',
    'config'
  ])
  .factory('Campaign', [
    'ConvexModel',
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
