'use strict';

var angular = require('angular');
var config  = require('./config');

angular.module('config', [])
  .constant('config', config);

var requires = [
  'config',
  require('../kiosk'),
  require('../pledge'),
  require('../payment'),
  require('convex'),
  require('convex-firebase'),
  require('valet-io-pledge-models'),
  require('../campaign'),
  require('angular-loading'),
  'ui.router',
  require('angular-live-or-test'),
  require('angular-router-exception-handler')
];

/* istanbul ignore next */
if (config.sentry) {
  requires.push('ngRaven');
}

angular
  .module('PledgeApp', requires)
  .controller('AppController', require('./controller'))
  .directive('poweredByValet', require('./powered-by'))
  .config(configure)
  .config(require('./states'));

function configure (convexConfig, $locationProvider, config) {
  convexConfig.base = config.valet.api;
  convexConfig.firebase = config.firebase.endpoint;
  $locationProvider.html5Mode(true);
}
configure.$inject = ['convexConfig', '$locationProvider', 'config'];

/* istanbul ignore next */
if (config.sentry) {
  angular.module('ngRaven').constant('RavenConfig', config.sentry);
}

module.exports = 'PledgeApp';
