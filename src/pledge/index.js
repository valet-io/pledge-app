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
    require('angular-form-state')
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
  .controller('PaymentOptionsController', [
    '$scope',
    '$state',
    '$stateParams',
    require('./options-controller')
  ])
  .directive('bdTouch', [
    '$window',
    require('./bd-touch')
  ])
  .config([
    '$stateProvider',
    require('./routes')
  ]);

module.exports = 'PledgeModule';
