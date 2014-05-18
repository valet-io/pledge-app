'use strict';

require('ng-base-model');
require('angular-ui-router');

require('angular')
  .module('PaymentModule', [
    'ui.router',
    'valet-base-model',
    'PledgeModule',
    'DonorModule'
  ])
  .factory('Payment', require('./PaymentModel'))
  .controller('PaymentController', require('./PaymentController'))
  .config(require('./PaymentRoutes'));

module.exports = 'PaymentModule';