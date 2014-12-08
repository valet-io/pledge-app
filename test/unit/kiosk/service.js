'use strict';

var angular = require('angular');

module.exports = function () {

  var kiosk, $state, Campaign, $stateParams, $rootScope;
  beforeEach(angular.mock.inject(function ($injector) {
    kiosk        = $injector.get('kiosk');
    $state       = $injector.get('$state');
    Campaign     = $injector.get('Campaign');
    $stateParams = $injector.get('$stateParams');
    $rootScope   = $injector.get('$rootScope');
  }));

  describe('.enabled', function () {

    it('tracks the value of $stateParams.kiosk', function () {
      $stateParams.kiosk = void 0;
      $rootScope.$digest();
      expect(kiosk.enabled).to.be.false;
      $stateParams.kiosk = 'true';
      $rootScope.$digest();
      expect(kiosk.enabled).to.be.true;
    });

  });

  describe('#reset', function () {

    beforeEach(function () {
      sinon.stub($state, 'go');
    });

    it('is a noop if kiosk is disabled', function () {
      kiosk.reset();
      expect($state.go).to.not.have.been.called;
    });

    it('redirects to pledge.create for the active campaign if kiosk is enabled', function () {
      Campaign.active = {
        id: 'activeId'
      };
      kiosk.enabled = true;
      kiosk.reset();
      expect($state.go).to.have.been.calledWithMatch('pledge.create', {
        campaign: 'activeId'
      });
    });

  });

};
