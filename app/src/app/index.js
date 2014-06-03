'use strict';

require('raven-angular');

require('angular')
  .module('valet-io-pledge-app', [
    'ngRaven',
    require('../campaign'),
    require('../pledge'),
    require('../donor'),
    require('../payment')
  ])
  .controller('AppController', require('./AppController'))
  .value('RavenConfig', {
    dsn: 'https://25f8464cfb0b4d63ac7c5840a569382e@app.getsentry.com/25248'
  });

module.exports = 'PledgeAppModule';
