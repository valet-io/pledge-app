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
  .factory('Pledge', require('./PledgeModel'))
  .controller('PledgeController', require('./PledgeController'))
  .controller('PaymentOptionsController', require('./PaymentOptionsController'))
  .config(require('./PledgeRoutes'));

module.exports = 'PledgeModule';
