'use strict';

require('ng-base-model');

require('angular')
  .module('PledgeModule', [
    'ui.router',
    'valet-base-model',
    'CampaignModule',
    'DonorModule',
    'PaymentModule',
    require('angular-names'),
    require('angular-form-state'),
    'ngMessages'
  ])
  .factory('Pledge', [
    'BaseModel',
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
    require('./controllers/confirmation')
  ])
  .config([
    '$stateProvider',
    require('./routes')
  ]);

module.exports = 'PledgeModule';
