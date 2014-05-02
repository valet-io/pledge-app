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
    $rootScope.$apply(function () {
      $location.url('');
    });
    expect($state.current.name).to.equal('pledge');
  });

});