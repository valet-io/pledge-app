'use strict';

var angular = require('angular');

describe('Campaign: Controller', function () {

  var $controller, scope;
  beforeEach(angular.mock.module(require('../../../src')));
  beforeEach(angular.mock.inject(function ($injector) {
    scope       = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');
  }));

  it('publishes the campaign on the scope', function () {
    var campaign = {};
    $controller('CampaignController', {
      $scope: scope,
      campaign: campaign
    });
    expect(scope).to.have.property('campaign', campaign);
  });

});
