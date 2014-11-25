'use strict';

var angular = require('angular');
var util    = require('../../util');

module.exports = function () {
  var $injector, config, $state, $httpBackend;
  beforeEach(angular.mock.inject(function (_$injector_) {
    $injector    = _$injector_;
    $httpBackend = $injector.get('$httpBackend');
    config       = $injector.get('config');
    $state       = $injector.get('$state');
  }));

  describe('create', function () {

    var state;
    beforeEach(function () {
      state = $state.get('payment.create');
    });

    it('gets the pledge with donor and stripe info', angular.mock.inject(function ($injector) {
      $httpBackend
        .expectGET(config.valet.api + util.encodeBrackets('/pledges/thePledgeId?expand[0]=donor&expand[1]=campaign.organization.stripe'))
        .respond(200, {
          id: 'thePledgeId',
          donor: {
            id: 'theDonorId'
          },
          campaign: {
            id: 'theCampaignId',
            organization: {
              id: 'theOrganizationId',
              stripe: {}
            }
          }
        });
      $injector.get('$resolve').resolve(state.resolve, {
        $stateParams: {
          pledge: 'thePledgeId'
        }
      })
      .then(function (resolved) {
        expect(resolved.pledge).to.have.property('id', 'thePledgeId');
        expect(resolved.pledge).to.have.deep.property('donor.id', 'theDonorId');
      });
      $httpBackend.flush();
    }));

    it('passes a Stripe Connect key to the payment', function () {
      var pledge = new ($injector.get('Pledge'))();
      pledge.campaign = {
        organization: {
          stripe: {
            publishable_key: 'spk'
          }
        }
      };
      $injector.get('$resolve').resolve(state.resolve, {
        pledge: pledge
      })
      .then(function (resolved) {
        expect(resolved.payment).to.have.property('$key', 'spk');
      });
      $injector.get('$timeout').flush();
    });

  });

  describe('receipt', function () {

    var state;
    beforeEach(function () {
      state = $state.get('payment.receipt');
    });

    it('gets the payment with pledge + donor', angular.mock.inject(function ($injector) {
      $httpBackend
        .expectGET(config.valet.api + util.encodeBrackets('/payments/paymentId?expand[0]=pledge&expand[1]=pledge.donor'))
        .respond(200, {
          id: 'paymentId',
          pledge: {
            id: 'thePledgeId',
            donor: {
              id: 'theDonorId'
            }
          }
        });
      $injector.get('$resolve').resolve(state.resolve, {
        $stateParams: {
          id: 'paymentId'
        }
      })
      .then(function (resolved) {
        expect(resolved.payment)
          .to.have.property('id', 'paymentId');
        expect(resolved.payment)
          .to.have.deep.property('pledge.id', 'thePledgeId');
        expect(resolved.payment)
          .to.have.deep.property('pledge.donor.id', 'theDonorId');
      });
      $httpBackend.flush();
    }));

    it('skips the request if data already exists', angular.mock.inject(function ($injector) {
      var Payment = $injector.get('Payment');
      var payment = new Payment({
        id: 'paymentId',
        pledge: {
          donor: {}
        }
      });
      $injector.get('$resolve').resolve(state.resolve, {
        $stateParams: {
          id: 'paymentId'
        }
      })
      .then(function (resolved) {
        expect(resolved.payment).to.equal(payment);
      });
      $injector.get('$timeout').flush();
    }));

  });

};
