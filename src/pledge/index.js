'use strict';

require('ng-base-model');

require('angular')
  .module('PledgeModule', [
    'ui.router',
    'CampaignModule',
    'DonorModule',
    require('angular-names'),
    require('angular-form-state'),
    'convex',
    'ngMessages'
  ])
  .factory('Pledge', [
    'ConvexModel',
    require('./model')
  ])
  .controller('PledgeCreateController', [
    '$scope',
    'Pledge',
    'campaign',
    '$state',
    '$http',
    require('./controllers/create')
  ])
  .controller('PledgeConfirmationController', [
    '$scope',
    'pledge',
    '$timeout',
    '$state',
    require('./controllers/confirmation')
  ])
  .config([
    '$stateProvider',
    require('./routes')
  ]);

module.exports = 'PledgeModule';
