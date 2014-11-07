'use strict';

beforeEach(function () {
  angular.mock.module(require('../../'));
  angular.mock.module(function ($provide) {
    $provide.value('Firebase', require('mockfirebase').MockFirebase);
  })
});
afterEach(function () {
  angular.mock.inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});

describe('Pledge', function () {
  describe('Controllers', require('./pledge/controllers'));
  describe('States', require('./pledge/states'));
});
describe('Payment', function () {
  describe('Controllers', require('./payment/controllers'));
  describe('States', require('./payment/states'));
});
