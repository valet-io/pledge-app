'use strict';

require('angular')
  .module('valet-io-pledge-app', [
    require('../campaign'),
    require('../pledge')
  ])
  .controller('AppController', require('./AppController'));

module.exports = 'PledgeAppModule';