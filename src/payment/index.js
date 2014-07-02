'use strict';

require('ng-base-model');

require('angular')
  .module('PaymentModule', [
    'ui.router',
    'valet-base-model',
    require('angular-stripe'),
    require('angular-form-state'),
    require('angular-credit-cards'),
    'PledgeModule',
    'DonorModule',
    'config'
  ])
  .factory('Payment', [
    'BaseModel',
    'stripe',
    require('./model')
  ])
  .controller('PaymentController', [
    '$scope',
    'pledge',
    'Payment',
    '$q',
    '$http',
    require('./controller')
  ])
  .config([
    '$stateProvider',
    require('./routes')
  ])
  .config([
    'config',
    'stripeProvider',
    function (config, stripeProvider) {
      stripeProvider.setPublishableKey(config.stripe.key);
    }
  ]);

module.exports = 'PaymentModule';
