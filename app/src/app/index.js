'use strict';

var angular = require('angular');
var config  = require('./config');

var requires = [
  require('../campaign'),
  require('../pledge'),
  require('../donor'),
  require('../payment')
];

if (config.env !== 'development') {
  require('raven-angular');
  requires.push('ngRaven');
}

var app = angular
  .module('valet-io-pledge-app', requires)
  .controller('AppController', require('./AppController'))
  .value('config', config);

if (config.env !== 'development') {
  app
    .factory('RavenConfig', [
      'config', 
      function (config) {
        return config.raven;
      }
    ]);
}  

module.exports = 'PledgeAppModule';
