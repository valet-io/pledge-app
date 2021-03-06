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

    it('resolves the campaign by id', angular.mock.inject(function ($injector) {
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

    it('sets a start time for the pledge', function () {
      var pledge = $injector.invoke($state.get('pledge.create').resolve.pledge, null, {
        $stateParams: {
          test: true
        },
        campaign: new ($injector.get('Campaign'))(),
        isLive: true
      });
      expect(pledge.started_at).to.be.a('date');
    });

    it('sets live mode using the "test" query param', function () {
      $injector.invoke($state.get('pledge.create').resolve.pledge, null, {
        $stateParams: {
          test: true
        },
        campaign: new ($injector.get('Campaign'))()
      });
      expect($injector.get('live').enabled()).to.be.false;
    });

  });

  describe('confirmation', function () {

    var state;
    beforeEach(function () {
      state = $state.get('pledge.confirmation');
    });

    it('gets the pledge with donor and campaign', angular.mock.inject(function ($injector) {
      var url = util.encodeBrackets(config.valet.api + '/pledges/theId?expand[0]=donor&expand[1]=campaign');
      $httpBackend
        .expectGET(url)
        .respond(200, {
          id: 'theId',
          donor_id: 'theDonorId',
          campaign_id: 'theCampaignId',
          live: true
        });
      $injector.get('$resolve').resolve(state.resolve, {
        $stateParams: {
          id: 'theId'
        }
      })
      .then(function (resolved) {
        expect(resolved.pledge).to.have.property('id', 'theId');
      });
      $httpBackend.flush();
    }));

    it('sets the "live" mode for the pledge', angular.mock.inject(function ($injector) {
      var url = util.encodeBrackets(config.valet.api + '/pledges/theId?expand[0]=donor&expand[1]=campaign');
      $httpBackend
        .expectGET(url)
        .respond(200, {
          id: 'theId',
          donor_id: 'theDonorId',
          campaign_id: 'theCampaignId',
          live: false
        });
      $injector.get('$resolve').resolve(state.resolve, {
        $stateParams: {
          id: 'theId'
        }
      })
      .then(function (resolved) {
        expect($injector.get('live').enabled()).to.be.false;
      });
      $httpBackend.flush();
    }));

    it('skips the request if data already exists', angular.mock.inject(function ($injector) {
      var Pledge = $injector.get('Pledge');
      var pledge = new Pledge({
        id: 'theId',
        donor: {},
        campaign: {}
      });
      $injector.get('$resolve').resolve(state.resolve, {
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

};
