'use strict';

var angular = require('angular');

describe('Pledge: Controllers', function () {

  var config, $controller, scope, $state, sandbox;
  beforeEach(angular.mock.module(require('../../../')));
  beforeEach(angular.mock.inject(function ($injector) {
    config      = $injector.get('config');
    $controller = $injector.get('$controller');
    scope       = $injector.get('$rootScope').$new();
    $state      = $injector.get('$state');
  }));

  describe('PledgeCreateController', function () {

    var Pledge, campaign;
    beforeEach(angular.mock.inject(function ($injector) {
      Pledge   = $injector.get('Pledge');
      campaign = new ($injector.get('Campaign'))();

     $controller('PledgeCreateController', {
        $scope: scope,
        $state: $state,
        Pledge: Pledge,
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
        .to.have.property('anonymous')
        .that.is.false;
      expect(scope.pledge)
        .to.have.property('donor');
    });

    describe('#submit', function () {

      it('submits the pledge and donor in a parallel batch', angular.mock.inject(function ($httpBackend) {
        $httpBackend
          .expectPOST(config.valet.api + '/batch', JSON.stringify({
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
        sinon.stub($state, 'go');
        scope.submit();
        $httpBackend.flush();
      }));

      it('transitions to the receipt', angular.mock.inject(function ($q, $timeout) {
        sinon.stub(scope.pledge.donor, '$save');
        sinon.stub(scope.pledge, '$save').returns($q.when());
        sinon.stub(scope.pledge, '$batch').yields({});
        sinon.stub($state, 'go');
        scope.submit();
        $timeout.flush();
        expect($state.go).to.have.been.calledWithMatch('^.confirmation', {
          id: scope.pledge.id
        });
      }));

    });

    describe('resolve', function () {

      it('fetches the campaign based on the url', angular.mock.inject(function ($resolve, $timeout) {
        var campaign = {
          $fetch: sinon.stub().returnsThis()
        };
        var Campaign = sinon.stub().returns(campaign);
        $resolve.resolve(require('../../../src/pledge/controllers/create').resolve, {
          Campaign: Campaign,
          $stateParams: {
            campaign: 'id'
          }
        })
        .then(function (resolved) {
          expect(Campaign).to.have.been.calledWith({
            id: 'id'
          });
          expect(campaign).to.equal(resolved.campaign);
          expect(campaign.$fetch).to.have.been.called;
        });
        $timeout.flush();
      }));

    });

  });

  describe('PledgeConfirmationController', function () {

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

    it('does not transition when payments are disabled', function () {
      pledge.campaign.payments = false;
      invoke();
      $timeout.flush();
      expect($state.go).to.not.have.been.called;
    });

    describe('resolve', function () {

      it('fetches the pledge based on the url', angular.mock.inject(function ($resolve) {
        var Pledge = sinon.stub().returns(pledge);
        $resolve.resolve(require('../../../src/pledge/controllers/confirmation').resolve, {
          Pledge: Pledge,
          $stateParams: {
            id: 'id'
          }
        })
        .then(function (resolved) {
          expect(Pledge).to.have.been.calledWithMatch({
            id: 'id'
          });
          expect(pledge).to.equal(resolved.pledge);
          expect(pledge.$fetch).to.have.been.calledWithMatch({
            expand: ['donor', 'campaign']
          });
        });
        $timeout.flush();
      }));

    });

  });

});
