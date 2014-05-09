'use strict';

require('ng-base-model');
require('angular-ui-router');

require('angular')
  .module('PledgeModule', [
    'ui.router',
    'valet-base-model',
    'CampaignModule',
    'DonorModule'
  ])
  .factory('Pledge', require('./PledgeModel'))
  .controller('PledgeController', require('./PledgeController'))
  .config(require('./PledgeRoutes'));

module.exports = 'PledgeModule';