'use strict';

var angular = require('angular');

require('angular-mocks');
require('../../../app/src/app');

describe('Payment: Controller', function () {

  var $controller, scope, $timeout, $q, Pledge, Payment;
  beforeEach(angular.mock.module('PledgeModule'));
  beforeEach(angular.mock.inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $timeout = $injector.get('$timeout');
    $q = $injector.get('$q');
    Pledge = new $injector.get('Pledge');
    $controller = $injector.get('$controller');
    Payment = $injector.get('Payment');
  }));

  var pledge;
  beforeEach(function () {
    pledge = new Pledge();
  });

  beforeEach(function () {
    $controller('PaymentController', {
      $scope: scope,
      pledge: pledge,
      Payment: Payment
    });
  });

  it('exposes a new payment model', function () {
    expect(scope)
      .to.have.a.property('payment')
      .that.is.an.instanceOf(Payment);
  });

  describe('payment#process', function () {

    var payment;
    beforeEach(function () {
      payment = scope.payment;
      sinon.stub(payment, 'token').returns($q.when());
      sinon.stub(payment, 'save').returns($q.when({
        id: 0
      }));
      sinon.stub(pledge, 'save');
    });

    it('creates a token', function () {
      payment.process().then(function () {
        expect(payment.token).to.have.been.called;
      });
      $timeout.flush();
    });

    it('saves the payment without the card', function () {
      payment.card = {};
      payment.process().then(function () {
        expect(payment.save).to.have.been.called;
        expect(payment.save.firstCall.thisValue)
          .to.not.have.property('card');
      });
      $timeout.flush();
    });

    it('saves the pledge with the payment id', function () {
      payment.process().then(function () {
        expect(pledge.save).to.have.been.called;
        expect(pledge).to.have.property('payment_id', 0);
      });
      $timeout.flush();
    });

  });

});