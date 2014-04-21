var angular = require('angular');

require('angular-mocks');
require('../../../app/src/campaign');

describe('Campaign Model', function () {
  var Campaign;
  beforeEach(angular.mock.module('campaignModule'));
  beforeEach(angular.mock.inject(function ($injector) {
    Campaign = $injector.get('Campaign');
  }));

  it('is a campaign', function () {
    console.log(Campaign);
  });

});