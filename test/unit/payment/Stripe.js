'use strict';

var angular = require('angular');
var Stripe  = require('stripe');

describe('Payment: Stripe', function () {
  var stripeService, $timeout;
  beforeEach(angular.mock.module(require('../../../app')));
  beforeEach(angular.mock.inject(function ($injector) {
    stripeService = $injector.get('Stripe');
    $timeout = $injector.get('$timeout');
  }));

  describe('#createToken', function () {

    it('resolves a token response', function (done) {
      var card = {}, token = {};
      Stripe.card.createToken = sinon.spy(function (card, callback) {
        setTimeout(function () {
          callback(200, token);
          $timeout.flush();
        });
      });
      stripeService.card.createToken(card).then(function (_token_) {
        expect(Stripe.card.createToken).to.have.been.calledWith(card);
        expect(_token_).to.equal(token);
        done();
      });
    });

    it('rejects with error responses', function (done) {
      var card = {}, error = {
        message: 'Card failed'
      };
      Stripe.card.createToken = sinon.spy(function (card, callback) {
        setTimeout(function () {
          callback(400, {
            error: error
          });
          $timeout.flush();
        });
      });
      stripeService.card.createToken(card).catch(function (err) {
        expect(err).to.equal(error);
        done();
      });
    });

  });

});
