var angular = require('angular');

require('angular-mocks');
require('../../../app/src/pledge');

describe('Pledge: Controller', function () {

  var $controller, scope, $q, $timeout, Pledge, Campaign;
  beforeEach(angular.mock.module('PledgeModule'));
  beforeEach(angular.mock.inject(function ($injector) {
    scope = $injector.get('$rootScope').$new(),
    $q = $injector.get('$q');
    $timeout = $injector.get('$timeout');
    Pledge = $injector.get('Pledge');
    Campaign = $injector.get('Campaign');
    $controller = $injector.get('$controller');
  }));

  it('exposes a new pledge model', function () {
    sinon.stub(Campaign, 'active').returns($q.when({id: 0}));
    $controller('PledgeController', {
      $scope: scope
    });
    $timeout.flush();
    expect(scope)
      .to.have.a.property('pledge')
      .that.is.an.instanceOf(Pledge)
      .with.property('campaign_id', 0);
  });

});