'use strict';

var angular = require('angular');

require('angular-mocks');
require('../../../app/src/pledge');

describe('Pledge: Routes', function () {

  var $state, $location, $rootScope;
  beforeEach(angular.mock.module('PledgeModule'));
  beforeEach(angular.mock.inject(function ($injector) {
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $rootScope = $injector.get('$rootScope');
  }));

  it('redirects the root to the pledge state', function () {
    var stateChangeCallback = sinon.spy(function (event) {
      event.preventDefault();
    });
    $rootScope.$on('$stateChangeStart', stateChangeCallback);
    $rootScope.$apply(function () {
      $location.url('');
    });
    expect(stateChangeCallback.firstCall.args[1].name).to.equal('pledge');
  });

});