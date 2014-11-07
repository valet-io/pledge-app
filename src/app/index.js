'use strict';

var angular = require('angular');
var config  = require('./config');

angular.module('config', [])
  .constant('config', config);

var requires = [
  'config',
  require('../campaign'),
  require('../pledge'),
  require('../donor'),
  require('../payment'),
  require('convex'),
  require('convex-firebase'),
  'ui.router'
];

if (config.sentry) {
  requires.push('ngRaven');
}

angular
  .module('PledgeApp', requires)
  .controller('AppController', require('./controller'))
  .directive('bdLoading', [
    require('./loading')
  ])
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

if (config.sentry) {
  angular.module('ngRaven').constant('RavenConfig', config.sentry);
}

module.exports = 'PledgeApp';
