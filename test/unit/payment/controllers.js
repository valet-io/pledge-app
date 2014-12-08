'use strict';

var angular = require('angular');

module.exports = function () {

  var config, $controller, $httpBackend, $q, scope, $state, $timeout;
  beforeEach(angular.mock.inject(function ($injector) {
    config       = $injector.get('config');
    $controller  = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $q           = $injector.get('$q');
    scope        = $injector.get('$rootScope').$new();
    $state       = $injector.get('$state');
    $timeout     = $injector.get('$timeout');
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

    describe('#updatePledgeAmount', function () {

      it('is a noop for a a falsy value', function () {
        scope.updatePledgeAmount(void 0);
        expect(pledge.amount).to.equal(100);
      });

      it('updates and saves the pledge amount', function () {
        sinon.stub(pledge, '$save');
        scope.updatePledgeAmount(110);
        expect(pledge.amount).to.equal(110);
        expect(pledge.$save).to.have.been.called;
      });

    });

    describe('#process', function () {

      beforeEach(function () {
        sinon.stub($state, 'go');
        scope.paymentForm = {
          submission: {}
        };
        sinon.stub(scope.payment, 'zipLookup').resolves(scope.payment);
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

      it('allows #zipLookup 1s to complete and can recover', function () {
        var deferred = $q.defer();
        sinon.stub(scope.payment, '$batch').resolves();
        scope.payment.zipLookup = function (options) {
          $timeout(function () {
            deferred.reject(new Error('timeout'));
          }, options.timeout);
          return deferred.promise;
        };
        scope.process();
        $timeout.flush(1000);
        expect(scope.payment.tokenize).to.have.been.called;
        expect(scope.payment.$batch).to.have.been.called;
      });

      it('batches a new payment and donor save', function () {
        $httpBackend
          .expectPOST(config.valet.api + '/batch', angular.toJson({
            requests: [
              {
                method: 'PUT',
                path: '/donors/' + scope.donor.id,
                payload: scope.donor
              },
              {
                method: 'POST',
                path: '/payments',
                payload: scope.payment
              }
            ],
            parallel: false
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

    var payment, scope, kiosk, $timeout, $controller, $injector;
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
      kiosk = {
        reset: sinon.stub()
      };
      $timeout = $injector.get('$timeout');
      $controller = $injector.get('$controller');
    }));

    function invoke () {
      $controller('PaymentReceiptController', {
         $scope: scope,
         payment: payment,
         kiosk: kiosk
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

    it('requests a reset', function () {
      invoke();
      $timeout.flush();
      expect(kiosk.reset).to.have.been.called;
    });

  });

};
