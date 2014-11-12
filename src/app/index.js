'use strict';

var angular = require('angular');
var config  = require('./config');

angular.module('config', [])
  .constant('config', config);

var requires = [
  'config',
  require('../pledge'),
  require('../payment'),
  require('convex'),
  require('convex-firebase'),
  require('valet-io-pledge-models'),
  require('angular-loading'),
  'ui.router'
];

/* istanbul ignore next */
if (config.sentry) {
  requires.push('ngRaven');
}

angular
  .module('PledgeApp', requires)
  .controller('AppController', require('./controller'))
  .config([
    'convexConfig',
    '$locationProvider',
    'config',
    function (convexConfig, $locationProvider, config) {
      convexConfig.base = config.valet.api;
      convexConfig.firebase = config.firebase.endpoint;
      $locationProvider.html5Mode(true);
    }
  ])
  .config(require('./routes'));

/* istanbul ignore next */
if (config.sentry) {
  angular.module('ngRaven').constant('RavenConfig', config.sentry);
}

module.exports = 'PledgeApp';
