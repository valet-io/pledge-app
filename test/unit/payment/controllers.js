'use strict';

var angular = require('angular');

describe('Payment: Controllers', function () {

  var config, $controller, scope, $state, sandbox;
  beforeEach(angular.mock.module(require('../../../')));
  beforeEach(angular.mock.inject(function ($injector) {
    config      = $injector.get('config');
    $controller = $injector.get('$controller');
    scope       = $injector.get('$rootScope').$new();
    $state      = $injector.get('$state');
  }));

  describe('PaymentCreateController', function () {

    var Payment, paymentpledge;
    beforeEach(angular.mock.inject(function ($injector) {
      var Donor = $injector.get('Donor');
      var Pledge = $injector.get('Pledge');
      Payment  = $injector.get('Payment');
      pledge   = new Pledge({
        amount: 100,
        donor: new Donor()
      });

     $controller('PaymentCreateController', {
        $scope: scope,
        $state: $state,
        pledge: pledge,
        Payment: Payment
      });
    }));

    it('publishes a new payment to the scope', function () {
      expect(scope.payment).to.be.an.instanceOf(Payment);
      expect(scope.payment.amount).to.equal(scope.pledge.amount);
    });

    it('publishes the pledge to the scope', function () {
      expect(scope.pledge).to.equal(pledge);
    });

    it('publishes the donor to the scope', function () {
      expect(scope.donor).to.equal(pledge.donor);
    });

  });

});
