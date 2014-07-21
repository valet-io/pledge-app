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
  .controller('PledgeController', [
    '$scope',
    'Pledge',
    'campaign',
    '$state',
    require('./controller')
  ])
  .config([
    '$stateProvider',
    require('./routes')
  ]);

module.exports = 'PledgeModule';