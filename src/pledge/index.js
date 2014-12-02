'use strict';

require('angular')
  .module('PledgeModule', [
    'ui.router',
    require('angular-names'),
    require('angular-form-state'),
    require('angular-text-toggle'),
    require('angular-integer'),
    'valet-io-pledge-models',
    'ngMessages'
  ])
  .controller('PledgeCreateController', require('./controllers').Create)
  .controller('PledgeConfirmationController', require('./controllers').Confirmation)
  .config(require('./states'));

module.exports = 'PledgeModule';
