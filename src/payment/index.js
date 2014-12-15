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
  .factory('stripeKey', require('./key'))
  .controller('PaymentCreateController', require('./controllers').Create)
  .controller('PaymentReceiptController', require('./controllers').Receipt)
  .directive('editable', require('./editable').main)
  .directive('editableDisplay', require('./editable').display)
  .directive('editableField', require('./editable').field)
  .config(require('./states'))
  .config(configureStripe);

function configureStripe (config, stripeProvider) {
  stripeProvider.setPublishableKey(config.stripe.key);
}
configureStripe.$inject = ['config', 'stripeProvider'];

module.exports = 'PaymentModule';
