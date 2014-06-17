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
];

if (config.env !== 'development') {
  requires.push('ngRaven');
}

var app = angular
  .module('PledgeApp', requires)
  .controller('AppController', require('./AppController'))

if (config.env !== 'development') {
  app.factory('RavenConfig', [
    'config',
    function (config) {
      return config.raven;
    }
  ]);
}

module.exports = 'PledgeApp';
