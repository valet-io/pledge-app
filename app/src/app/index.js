'use strict';

require('angular')
  .module('valet-io-pledge-app', [
    require('../campaign'),
    require('../pledge'),
    require('../donor')
  ])
  .controller('AppController', require('./AppController'));

module.exports = 'PledgeAppModule';