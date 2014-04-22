'use strict';

require('./campaign');

require('angular')
  .module('valet-io-pledge-app', [
    'CampaignModule',
    'PledgeModule'
  ])
  .controller('AppController', require('./AppController'));