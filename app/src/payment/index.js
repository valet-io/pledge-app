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
  .provider('Stripe', require('./Stripe'))
  .config(require('./PaymentRoutes'))
  .config(function (StripeProvider) {
    StripeProvider.setPublishableKey('pk_live_yWqCp6tJNUiX7Ea7PZUcWpuP');
  });

module.exports = 'PaymentModule';