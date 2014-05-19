var angular = require('angular');

require('angular-mocks');
require('../../../app/src/app');

describe('Campaign: Model', function () {
  var Campaign, BaseModel, localStorageService, $timeout, $location, $q;
  beforeEach(angular.mock.module('CampaignModule'));
  beforeEach(angular.mock.inject(function ($injector) {
    Campaign = $injector.get('Campaign');
    BaseModel = $injector.get('BaseModel');
    localStorageService = $injector.get('localStorageService');
    $location = $injector.get('$location')
    $timeout = $injector.get('$timeout');
    $q = $injector.get('$q');
  }));

  describe('Campaign#active', function () {

    beforeEach(function () {
      sinon.stub($location, 'host').returns('activeHost');
    });

    it('returns a cached campaign by host', function () {
      sinon.stub(localStorageService, 'get')
        .withArgs('valet-campaign-activeHost')
        .returns({
          id: 0
        });
      Campaign.active().then(function (campaign) {
        expect(campaign).to.have.property('id', 0);
      });
      $timeout.flush();
    });

    it('finds and uncached campaign and then caches', function () {
      sinon.stub(Campaign, 'find').returns($q.when({host: 'activeHost'}));
      sinon.stub(localStorageService, 'add');
      Campaign.active().then(function (campaign) {
        expect(campaign).to.have.property('host', $location.host());
      });
      $timeout.flush();
      expect(localStorageService.add)
        .to.have.been.calledWith('valet-campaign-activeHost', sinon.match.has('host'));
    });

  });

});