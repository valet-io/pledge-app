'use strict';

var angular = require('angular');

module.exports = function () {

  var config, $controller, $httpBackend, $q, scope, $state;
  beforeEach(angular.mock.module(require('../../../')));
  beforeEach(angular.mock.inject(function ($injector) {
    config       = $injector.get('config');
    $controller  = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $q           = $injector.get('$q');
    scope        = $injector.get('$rootScope').$new();
    $state       = $injector.get('$state');
  }));

  describe('Create', function () {

    var Payment, pledge;
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

    describe('#process', function () {

      beforeEach(function () {
        sinon.stub($state, 'go');
        scope.paymentForm = {
          submission: {}
        };
        sinon.stub(scope.payment, 'tokenize')
          .returns($q.when(scope.payment));
      });

      it('clones the payment if its a re-attempt', function () {
        var previous = scope.payment;
        scope.paymentForm.submission.failed = true;
        scope.process();
        var active = scope.payment;
        expect(active.id).to.not.equal(previous.id);
        expect(active.$$saved).to.be.false;
        expect(active.pledge).to.equal(previous.pledge);
      });

      it('batches a new payment and donor save', function () {
        $httpBackend
          .expectPOST(config.valet.api + '/batch', angular.toJson({
            requests: [
              {
                method: 'POST',
                path: '/payments',
                payload: scope.payment
              },
              {
                method: 'PUT',
                path: '/donors/' + scope.donor.id,
                payload: scope.donor
              }
            ],
            parallel: true
          }))
          .respond(200, [
            scope.payment,
            scope.donor
          ]);
        scope.process();
        $httpBackend.flush();
      });

      it('transitions to the receipt', angular.mock.inject(function ($q, $timeout) {
        sinon.stub(scope.payment, '$batch').returns($q.when());
        scope.process();
        $timeout.flush();
        expect($state.go).to.have.been.calledWithMatch('^.receipt', {
          id: scope.payment.id
        });
      }));

    });

  });

};