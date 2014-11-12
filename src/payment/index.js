'use strict';

require('angular')
  .module('PaymentModule', [
    'ui.router',
    require('angular-stripe'),
    require('angular-form-state'),
    require('angular-credit-cards'),
    'valet-io-pledge-models',
    'ngMessages',
    'config'
  ])
  .controller('PaymentCreateController', require('./controllers').Create)
  .controller('PaymentReceiptController', require('./controllers').Receipt)
  .config(require('./states'))
  .config(configureStripe);

function configureStripe (config, stripeProvider) {
  stripeProvider.setPublishableKey(config.stripe.key)
}
configureStripe.$inject = ['config', 'stripeProvider'];

module.exports = 'PaymentModule';
