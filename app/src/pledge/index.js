'use strict';

require('ng-base-model');
require('angular-ui-router');
require('../campaign/index');

require('angular')
  .module('pledgeModule', [
    'ui.router',
    'valet-base-model',
    'campaignModule'
  ])
  .factory('Pledge', require('./PledgeModel'))
  .controller('PledgeController', require('./PledgeController'));