'use strict';

require('angular')
  .module('PledgeModule', [
    'ui.router',
    'CampaignModule',
    'DonorModule',
    require('angular-names'),
    require('angular-form-state'),
    'convex',
    'ngMessages'
  ])
  .factory('Pledge', require('./model'))
  .controller('PledgeCreateController', require('./controllers').Create)
  .controller('PledgeConfirmationController', require('./controllers').Confirmation)
  .config(require('./routes'));

module.exports = 'PledgeModule';
