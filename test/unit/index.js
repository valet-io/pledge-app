'use strict';

beforeEach(function () {
  angular.mock.module(require('../../'));
});
afterEach(function () {
  angular.mock.inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});

describe('App', function () {
  describe('Controller', require('./app/controller'));
});
describe('Pledge', function () {
  describe('Controllers', require('./pledge/controllers'));
  describe('States', require('./pledge/states'));
});
describe('Payment', function () {
  describe('Controllers', require('./payment/controllers'));
  describe('States', require('./payment/states'));
});
