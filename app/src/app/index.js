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

if (config.env !== 'development') {
  requires.push('ngRaven');
}

var app = angular
  .module('PledgeApp', requires)
  .controller('AppController', require('./AppController'))
  .config(function (BaseModelProvider) {
    BaseModelProvider.baseURL = 'http://api.valet.io';
  });

if (config.env !== 'development') {
  app.factory('RavenConfig', [
    'config',
    function (config) {
      return config.raven;
    }
  ]);
}

module.exports = 'PledgeApp';
