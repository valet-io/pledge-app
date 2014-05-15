var angular = require('angular');

require('angular-mocks');
require('../../../app/src/app');

describe('Pledge: Controller', function () {

  var $controller, scope, $q, $timeout, Pledge, Donor, campaign;
  beforeEach(angular.mock.module('PledgeModule'));
  beforeEach(angular.mock.inject(function ($injector) {
    scope = $injector.get('$rootScope').$new(),
    $q = $injector.get('$q');
    $timeout = $injector.get('$timeout');
    Pledge = $injector.get('Pledge');
    Donor = $injector.get('Donor');
    $controller = $injector.get('$controller');
  }));

  beforeEach(function () {
    campaign = {
      id: 0
    };
  });

  it('exposes a new pledge model', function () {
    $controller('PledgeController', {
      $scope: scope,
      campaign: campaign
    });
    expect(scope)
      .to.have.a.property('pledge')
      .that.is.an.instanceOf(Pledge)
      .with.property('campaign_id', 0);
    expect(scope.pledge)
      .to.have.a.property('donor')
      .that.is.an.instanceOf(Donor);
  });

});