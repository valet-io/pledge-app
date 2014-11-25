'use strict';

var angular = require('angular');

module.exports = function () {

  var config, $controller, $httpBackend, $q, scope, $state;
  beforeEach(angular.mock.inject(function ($injector) {
    config       = $injector.get('config');
    $controller  = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $q           = $injector.get('$q');
    scope        = $injector.get('$rootScope').$new();
    $state       = $injector.get('$state');
  }));

  describe('Create', function () {

    var Payment, payment, pledge;
    beforeEach(angular.mock.inject(function ($injector) {
      var Donor = $injector.get('Donor');
      var Pledge = $injector.get('Pledge');
      Payment  = $injector.get('Payment');
      pledge   = new Pledge({
        amount: 100,
        donor: new Donor()
      });
      payment  = pledge.payments.$new();

      $controller('PaymentCreateController', {
        $scope: scope,
        pledge: pledge,
        payment: payment
      });
    }));

    it('publishes the payment to the scope', function () {
      expect(scope.payment).to.equal(payment);
      expect(payment.amount).to.equal(pledge.amount);
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
        sinon.stub(scope.payment, 'tokenize').resolves(scope.payment);
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
        sinon.stub(scope.payment, '$batch').resolves();
        scope.process();
        $timeout.flush();
        expect($state.go).to.have.been.calledWithMatch('^.receipt', {
          id: scope.payment.id
        });
      }));

    });

  });

  describe('Receipt', function () {

    var payment, scope, $stateParams, $timeout, $controller, $injector;
    beforeEach(angular.mock.inject(function (_$injector_) {
      $injector = _$injector_;
      var Payment = $injector.get('Payment');
      payment = new Payment({
        pledge: {
          donor: {},
          campaign_id: 'theCampaign'
        }
      });
      scope = $injector.get('$rootScope').$new();
      $stateParams = {};
      $timeout = $injector.get('$timeout');
      $controller = $injector.get('$controller');
    }));

    function invoke () {
      $controller('PaymentReceiptController', {
         $scope: scope,
         payment: payment,
         $stateParams: $stateParams,
       });
    }

    it('publishes the payment to the scope', function () {
      invoke();
      expect(scope.payment).to.equal(payment);
    });

    it('publishes the pledge to the scope', function () {
      invoke();
      expect(scope.pledge).to.equal(payment.pledge);
    });

    it('publishes the donor to the scope', function () {
      invoke();
      expect(scope.donor).to.equal(payment.pledge.donor);
    });

    it('transitions back to a new pledge in kiosk mode', function () {
      $stateParams.kiosk = true;
      sinon.stub($state, 'go');
      invoke();
      $timeout.flush();
      expect($state.go).to.have.been.calledWithMatch('pledge.create', {
        campaign: 'theCampaign'
      });
    });

  });

};
