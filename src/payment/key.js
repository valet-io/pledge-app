'use strict';

module.exports = function (live, config) {
  var stripe = {
    default: function () {
      return live.enabled() ? config.stripe.key : config.stripe.test_key;
    },
    organization: function (organization) {
      return live.enabled() ? organization.stripe.publishable_key : organization.stripe.test_publishable_key;
    },
    get: function (organization) {
      return organization.stripe.connect ? stripe.organization(organization) : stripe.default();
    }
  };
  return stripe;
};
module.exports.$inject = ['live', 'config'];
