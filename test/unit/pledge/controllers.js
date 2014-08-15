'use strict';

var angular = require('angular');

describe('Pledge: Controllers', function () {

  var config, $controller, scope;
  beforeEach(angular.mock.module(require('../../../src')));
  beforeEach(angular.mock.inject(function ($injector) {
    config      = $injector.get('config');
    $controller = $injector.get('$controller');
    scope       = $injector.get('$rootScope').$new();
  }));

  describe('PledgeCreateController', function () {

    var $state, Pledge, campaign;
    beforeEach(angular.mock.inject(function ($injector) {
      $state   = $injector.get('$state');
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
                query: {},
                payload: scope.pledge.donor
              },
              {
                method: 'POST',
                path: '/pledges',
                query: {},
                payload: scope.pledge
              }
            ],
            parallel: true
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
        sinon.stub(scope.pledge, '$batch').returns($q.when());
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

});
