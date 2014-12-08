'use strict';

module.exports = require('angular')
  .module('CampaignActive', [
    'valet-io-pledge-models'
  ])
  .config(decorator)
  .name;

function decorator ($provide) {
  function decorate ($delegate) {
    $delegate.prototype.$active = function () {
      this.constructor.active = this;
      return this;
    };
    return $delegate;
  }
  decorate.$inject = ['$delegate'];
  $provide.decorator('Campaign', decorate);
}
decorator.$inject = ['$provide'];

