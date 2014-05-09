var angular = require('angular');

require('angular-mocks');
require('../../../app/src');

describe('Pledge: Controller', function () {

  var $controller, scope, $q, $timeout, Pledge, Campaign, Donor;
  beforeEach(angular.mock.module('PledgeModule'));
  beforeEach(angular.mock.inject(function ($injector) {
    scope = $injector.get('$rootScope').$new(),
    $q = $injector.get('$q');
    $timeout = $injector.get('$timeout');
    Pledge = $injector.get('Pledge');
    Campaign = $injector.get('Campaign');
    Donor = $injector.get('Donor');
    $controller = $injector.get('$controller');
  }));

  it('exposes a new pledge model with a related donor', function () {
    sinon.stub(Campaign, 'active').returns($q.when({id: 0}));
    $controller('PledgeController', {
      $scope: scope
    });
    $timeout.flush();
    expect(scope.pledge)
      .to.be.an.instanceOf(Pledge)
      .with.property('campaign_id', 0);
    expect(scope.pledge)
      .to.have.a.property('donor')
      .that.is.an.instanceOf(Donor);
  });

});