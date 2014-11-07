'use strict';

var angular = require('angular');
var util    = require('../../util');

describe('Pledge: Controllers', function () {

  var config, $controller, scope, $state, $httpBackend, sandbox;
  beforeEach(angular.mock.module(require('../../../')));
  beforeEach(angular.mock.module(function ($provide) {
    $provide.value('Firebase', require('mockfirebase').MockFirebase);
  }));
  beforeEach(angular.mock.inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    config       = $injector.get('config');
    $controller  = $injector.get('$controller');
    scope        = $injector.get('$rootScope').$new();
    $state       = $injector.get('$state');
  }));

  describe('getCampaign', function () {

    it('gets the campaign by id', angular.mock.inject(function ($injector) {
      $httpBackend
        .expectGET(config.valet.api + '/campaigns/theId')
        .respond(200, {
          id: 'theId'
        });
      $injector.get('$resolve').resolve($state.get('pledge.create').resolve, {
        $stateParams: {
          campaign: 'theId'
        }
      })
      .then(function (resolved) {
        expect(resolved.campaign).to.have.property('id', 'theId');
      });
      $httpBackend.flush();
    }));

  });


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

      it('submits the pledge and donor in a parallel batch', function () {
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
        sinon.stub($state, 'go');
        scope.submit();
        $httpBackend.flush();
      });

      it('transitions to the receipt', angular.mock.inject(function ($q, $timeout) {
        sinon.stub(scope.pledge.donor, '$save');
        sinon.stub(scope.pledge, '$save').returns($q.when());
        sinon.stub(scope.pledge, '$batch').yields({
          parallel: sinon.stub()
        });
        sinon.stub($state, 'go');
        scope.submit();
        $timeout.flush();
        expect($state.go).to.have.been.calledWithMatch('^.confirmation', {
          id: scope.pledge.id
        });
      }));

    });

  });

  describe('getPledge', function () {

    it('gets the pledge with donor and campaign', angular.mock.inject(function ($injector) {
      var url = util.encodeBrackets(config.valet.api + '/pledges/theId?expand[0]=donor&expand[1]=campaign');
      $httpBackend
        .expectGET(url)
        .respond(200, {
          id: 'theId'
        });
      $injector.get('$resolve').resolve($state.get('pledge.confirmation').resolve, {
        $stateParams: {
          id: 'theId'
        }
      })
      .then(function (resolved) {
        expect(resolved.pledge).to.have.property('id', 'theId');
      });
      $httpBackend.flush();
    }));

    it('skips the request if data already exists', angular.mock.inject(function ($injector, $httpBackend) {
      var Pledge = $injector.get('Pledge');
      var pledge = new Pledge({
        id: 'theId',
        donor: {},
        campaign: {}
      });
      $injector.get('$resolve').resolve($state.get('pledge.confirmation').resolve, {
        $stateParams: {
          id: 'theId'
        }
      })
      .then(function (resolved) {
        expect(resolved.pledge).to.equal(pledge);
      });
      $injector.get('$timeout').flush();
    }));

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

});
