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
  .factory('Pledge', require('./model'))
  .controller('PledgeController', require('./controller'))
  .controller('PaymentOptionsController', require('./options-controller'))
  .config(require('./routes'));

module.exports = 'PledgeModule';
