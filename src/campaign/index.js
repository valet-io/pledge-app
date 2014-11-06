'use strict';

require('angular')
  .module('CampaignModule', [
    'ui.router',
    'convex',
    'convex-firebase'
  ])
  .factory('Campaign', require('./model'))
  .config(require('./routes'));

module.exports = 'CampaignModule';
