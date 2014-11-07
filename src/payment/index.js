'use strict';

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
  .factory('Payment', require('./model'))
  .controller('PaymentCreateController', require('./controllers').Create)
  .controller('PaymentReceiptController', require('./controllers').Receipt)
  .config(require('./states'))
  .config(configureStripe);

function configureStripe (config, stripeProvider) {
  stripeProvider.setPublishableKey(config.stripe.key)
}
configureStripe.$inject = ['config', 'stripeProvider'];

module.exports = 'PaymentModule';
