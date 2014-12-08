'use strict';

var angular         = require('angular');
var chai            = require('chai').use(require('sinon-chai'));
var sinonAsPromised = require('sinon-as-promised');
global.expect       = chai.expect;
global.sinon        = require('sinon');
beforeEach(function () {
  angular.mock.module(require('../../'));
  angular.mock.inject(function ($q, $rootScope, $templateCache) {
    sinonAsPromised($q);
    sinonAsPromised.setScheduler(function (fn) {
      $rootScope.$evalAsync(fn);
    });
    $templateCache.put('/views/app/main.html', __html__['src/app/views/main.html']);
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
describe('Campaign', function () {
  describe('Model', require('./campaign/model'));
});
describe('Pledge', function () {
  describe('Controllers', require('./pledge/controllers'));
  describe('States', require('./pledge/states'));
});
describe('Payment', function () {
  describe('Controllers', require('./payment/controllers'));
  describe('States', require('./payment/states'));
});
describe('Kiosk', function () {
  describe('Header', require('./kiosk/header'));
  describe('Service', require('./kiosk/service'));
});
