'use strict';

var angular = require('angular');
var util    = require('../../util');

describe('Pledge: States', function () {

  var $injector, config, $state, $httpBackend;
  beforeEach(angular.mock.module(require('../../../')));
  beforeEach(angular.mock.inject(function (_$injector_) {
    $injector    = _$injector_;
    $httpBackend = $injector.get('$httpBackend');
    config       = $injector.get('config');
    $state       = $injector.get('$state');
  }));

  describe('create', function () {

    it('resolves the campaign by id', angular.mock.inject(function ($injector) {
      $httpBackend
        .expectGET(config.valet.api + '/campaigns/theId')
        .respond(200, {
          id: 'theId'
        });
      $injector.get('$resolve').resolve($state.get('pledge.create').resolve, {
        $stateParams: {
          campaign: 'theId'
        }
      })
      .then(function (resolved) {
        expect(resolved.campaign).to.have.property('id', 'theId');
      });
      $httpBackend.flush();
    }));

  });

  describe('confirmation', function () {

    var state;
    beforeEach(function () {
      state = $state.get('pledge.confirmation')
    });

    it('gets the pledge with donor and campaign', angular.mock.inject(function ($injector) {
      var url = util.encodeBrackets(config.valet.api + '/pledges/theId?expand[0]=donor&expand[1]=campaign');
      $httpBackend
        .expectGET(url)
        .respond(200, {
          id: 'theId'
        });
      $injector.get('$resolve').resolve(state.resolve, {
        $stateParams: {
          id: 'theId'
        }
      })
      .then(function (resolved) {
        expect(resolved.pledge).to.have.property('id', 'theId');
      });
      $httpBackend.flush();
    }));

    it('skips the request if data already exists', angular.mock.inject(function ($injector, $httpBackend) {
      var Pledge = $injector.get('Pledge');
      var pledge = new Pledge({
        id: 'theId',
        donor: {},
        campaign: {}
      });
      $injector.get('$resolve').resolve(state.resolve, {
        $stateParams: {
          id: 'theId'
        }
      })
      .then(function (resolved) {
        expect(resolved.pledge).to.equal(pledge);
      });
      $injector.get('$timeout').flush();
    }));

  });

});
