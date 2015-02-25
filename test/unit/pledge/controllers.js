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

    var pledge, campaign;
    beforeEach(angular.mock.inject(function ($injector) {
      pledge   = new ($injector.get('Pledge'))({
        donor: {}
      });
      campaign = new ($injector.get('Campaign'))();
      $controller('PledgeCreateController', {
        $scope: scope,
        campaign: campaign,
        pledge: pledge
      });
    }));

    it('publishes the campaign to $scope', function () {
      expect(scope.campaign).to.equal(campaign);
    });

    it('publishes the pledge to $scope', function () {
      expect(scope.pledge).to.equal(pledge);
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

      it('transitions to the confirmation', angular.mock.inject(function ($q, $timeout) {
        sinon.stub(scope.pledge, '$batch').resolves();
        scope.submit();
        $timeout.flush();
        expect($state.go).to.have.been.calledWithMatch('^.confirmation', {
          id: scope.pledge.id
        });
      }));

    });

  });

  describe('Confirmation', function () {

    var pledge, $interval;
    beforeEach(angular.mock.inject(function ($injector) {
      $interval = $injector.get('$interval');
      pledge = {
        id: 'id',
        campaign: {
          payments: true
        },
        $fetch: sinon.stub().resolves(pledge)
      };
      $controller('PledgeConfirmationController', {
         $scope: scope,
         pledge: pledge
       });
    }));

    it('publishes the pledges on the scope', function () {
      expect(scope.pledge).to.equal(pledge);
    });

    it('transitions to payment', function () {
      sinon.stub($state, 'go');
      $interval.flush(3000);
      expect($state.go).to.have.been.calledWithMatch('payment.create', {
        pledge: 'id'
      });
    });

    it('cancels the transition if destroyed', function () {
      sinon.stub($state, 'go');
      scope.$broadcast('$destroy');
      $interval.flush(3000);
      expect($state.go).to.not.have.been.called;
    });

  });
};
