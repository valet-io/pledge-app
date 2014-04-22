'use strict';

require('ng-base-model');
require('angular-ui-router');
require('../campaign/index');

require('angular')
  .module('PledgeModule', [
    'ui.router',
    'valet-base-model',
    'CampaignModule'
  ])
  .factory('Pledge', require('./PledgeModel'))
  .controller('PledgeController', require('./PledgeController'))
  .config(require('./PledgeRoutes'));