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
  require('convex')
];

if (config.sentry) {
  requires.push('ngRaven');
}

angular
  .module('PledgeApp', requires)
  .controller('AppController', [
    '$scope',
    require('./controller')
  ])
  .directive('bdLoading', [
    require('./loading')
  ])
  .filter('money', require('./money'))
  .filter('titlecase', require('./title-case'))
  .config([
    'convexConfig',
    '$locationProvider',
    'config',
    function (convexConfig, $locationProvider, config) {
      convexConfig.base = config.valet.api;
      $locationProvider.html5Mode(true);
    }
  ]);

if (config.sentry) {
  angular.module('ngRaven').constant('RavenConfig', config.sentry);
}

module.exports = 'PledgeApp';
