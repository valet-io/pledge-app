'use strict';

var angular = require('angular');

module.exports = function () {
  var config, $controller, scope, $state, $httpBackend;
  beforeEach(angular.mock.inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    config       = $injector.get('config');
    $controller  = $injector.get('$controller');
    scope        = $injector.get('$rootScope').$new();
    $state       = $injector.get('$state');
  }));

  describe('Create', function () {

    var Pledge, campaign;
    beforeEach(angular.mock.inject(function ($injector) {
      Pledge   = $injector.get('Pledge');
      campaign = new ($injector.get('Campaign'))();
     $controller('PledgeCreateController', {
        $scope: scope,
        $state: $state,
        campaign: campaign
      });
    }));

    it('publishes the campaign to $scope', function () {
      expect(scope.campaign).to.equal(campaign);
    });

    it('publishes the pledge to $scope', function () {
      expect(scope.pledge)
        .to.have.property('campaign_id', campaign.id);
      expect(scope.pledge)
        .to.have.property('donor');
    });

    describe('#submit', function () {

      beforeEach(function () {
        sinon.stub($state, 'go');
      });

      it('submits the pledge and donor in a sequential batch', function () {
        $httpBackend
          .expectPOST(config.valet.api + '/batch', angular.toJson({
            requests: [
              {
                method: 'POST',
                path: '/donors',
                payload: scope.pledge.donor
              },
              {
                method: 'POST',
                path: '/pledges',
                payload: scope.pledge
              }
            ],
            parallel: false
          }))
          .respond(200, [
            scope.pledge,
            scope.pledge.donor
          ]);
        scope.submit();
        $httpBackend.flush();
      });

      it('transitions to the receipt', angular.mock.inject(function ($q, $timeout) {
        sinon.stub(scope.pledge, '$batch').returns($q.when());
        scope.submit();
        $timeout.flush();
        expect($state.go).to.have.been.calledWithMatch('^.confirmation', {
          id: scope.pledge.id
        });
      }));

    });

  });

  describe('Confirmation', function () {

    var pledge, $timeout;
    beforeEach(angular.mock.inject(function ($injector) {
      $timeout = $injector.get('$timeout');
      $state   = {
        go: sinon.stub()
      };
      pledge = {
        id: 'id',
        campaign: {
          payments: true
        },
        $fetch: sinon.stub().returnsThis()
      };
    }));

    function invoke () {
      $controller('PledgeConfirmationController', {
         $scope: scope,
         pledge: pledge,
         $timeout: $timeout,
         $state: $state
       });
    }

    it('publishes the pledges on the scope', function () {
      invoke();
      expect(scope.pledge).to.equal(pledge);
    });

    it('transitions to payment when payments are enabled', function () {
      invoke();
      $timeout.flush();
      expect($state.go).to.have.been.calledWithMatch('payment.create', {
        pledge: 'id'
      });
    });

  });
};
