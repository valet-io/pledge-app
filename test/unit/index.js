'use strict';

var chai            = require('chai').use(require('sinon-chai'));
var sinonAsPromised = require('sinon-as-promised');
global.expect       = chai.expect;
global.sinon        = require('sinon');

beforeEach(function () {
  angular.mock.module(require('../../'));
  angular.mock.inject(function ($q, $rootScope) {
    sinonAsPromised($q);
    sinonAsPromised.setScheduler(function (fn) {
      $rootScope.$evalAsync(fn);
    });
  });
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
