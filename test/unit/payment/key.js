'use strict';

var angular = require('angular');

module.exports = function () {
  var $injector, stripeKey, live, config;
  beforeEach(angular.mock.inject(function (_$injector_) {
    $injector = _$injector_;
    stripeKey = $injector.get('stripeKey');
    live      = $injector.get('live');
    config    = $injector.get('config');
  }));

  beforeEach(function () {
    sinon.stub(live, 'enabled');
  });

  describe('#default', function () {

    it('gets the main key in live mode', function () {
      config.stripe.key = 'sk_live';
      live.enabled.returns(true);
      expect(stripeKey.default()).to.equal('sk_live');
    });

    it('gets the test key in test mode', function () {
      config.stripe.test_key = 'sk_test';
      live.enabled.returns(false);
      expect(stripeKey.default()).to.equal('sk_test');
    });

  });

  describe('#organization', function () {

    it('gets the main key in live mode', function () {
      live.enabled.returns(true);
      expect(stripeKey.organization({
        stripe: {
          publishable_key: 'connect_live'
        }
      }))
      .to.equal('connect_live');
    });

    it('gets the test key in test mode', function () {
      live.enabled.returns(false);
      expect(stripeKey.organization({
        stripe: {
          test_publishable_key: 'connect_test'
        }
      }))
      .to.equal('connect_test');
    });

  });

  describe('#get', function () {

    it('gets the org key if it uses connect', function () {
      live.enabled.returns(true);
      expect(stripeKey.get({
        stripe: {
          connect: true,
          publishable_key: 'connect_live'
        }
      }))
      .to.equal('connect_live');
    });

    it('gets the default key if the org does not use connect', function () {
      config.stripe.key = 'sk_live';
      live.enabled.returns(true);
      expect(stripeKey.get({
        stripe: {
          connect: false,
          publishable_key: 'sk_live'
        }
      }))
      .to.equal('sk_live');
    });

  });

};
