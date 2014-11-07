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

describe('Pledge', require('./pledge'));
describe('Payment', require('./payment'));
