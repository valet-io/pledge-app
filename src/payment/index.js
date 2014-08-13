'use strict';

require('ng-base-model');

require('angular')
  .module('PaymentModule', [
    'ui.router',
    require('angular-stripe'),
    require('angular-form-state'),
    require('angular-credit-cards'),
    'PledgeModule',
    'DonorModule',
    'ngMessages',
    'convex',
    'config'
  ])
  .factory('Payment', [
    'ConvexModel',
    'stripe',
    require('./model')
  ])
  .controller('PaymentCreateController', [
    '$scope',
    'pledge',
    'Payment',
    '$q',
    '$http',
    require('./controllers/create')
  ])
  .controller('PaymentReceiptController', [
    '$scope',
    'payment',
    require('./controllers/receipt')
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
