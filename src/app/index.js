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
  require('ng-base-model')
];

if (config.sentry) {
  requires.push('ngRaven');
}

var app = angular
  .module('PledgeApp', requires)
  .controller('AppController', require('./controller'))
  .config([
    'BaseModelProvider',
    '$locationProvider',
    'config',
    function (BaseModelProvider, $locationProvider, config) {
      BaseModelProvider.baseURL = config.valet.api;
      $locationProvider.html5Mode(true);
    }
  ]);

if (config.sentry) {
  angular.module('ngRaven').constant('RavenConfig', config.sentry);
}

module.exports = 'PledgeApp';
