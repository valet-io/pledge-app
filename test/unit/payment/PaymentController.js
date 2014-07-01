'use strict';

var angular = require('angular');

describe('Payment: Controller', function () {

  var $controller, scope, $timeout, $q, $httpBackend, Pledge, Payment;
  beforeEach(angular.mock.module(require('../../../src')));
  beforeEach(angular.mock.inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $timeout = $injector.get('$timeout');
    $q = $injector.get('$q');
    $httpBackend = $injector.get('$httpBackend');
    Pledge = new $injector.get('Pledge');
    $controller = $injector.get('$controller');
    Payment = $injector.get('Payment');
  }));

  var pledge;
  beforeEach(function () {
    pledge = new Pledge({id: 0, amount: 1});
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
      .that.is.an.instanceOf(Payment)
      .with.property('amount', 1);
  });

  describe('payment#process', function () {

    var payment;
    beforeEach(function () {
      payment = scope.payment;
      sinon.stub(payment, 'tokenize').returns($q.when({id: 'token'}));
      sinon.stub(payment, 'save').returns($q.when({
        id: 0
      }));
      sinon.stub(pledge, 'save');
      payment.address = {};
    });

    it('tokenizes, submits, and associates the payment', function () {
      $httpBackend
        .expectPOST('http://api.valet.io/payments', {
          token: 'token',
          amount: 1
        })
        .respond(201, {
          id: 'payment_id'
        });
      $httpBackend
        .expectPUT('http://api.valet.io/pledges/0', {
          id: 0,
          payment_id: 'payment_id'
        })
        .respond(200);
      payment.process();
      $httpBackend.flush();
    });

  });

});
