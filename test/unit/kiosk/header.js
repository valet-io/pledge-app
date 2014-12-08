'use strict';

var angular = require('angular');

module.exports = function () {

  var element, kiosk, $scope;
  beforeEach(angular.mock.inject(function (_kiosk_, $compile, $rootScope, $templateCache) {
    kiosk   = _kiosk_;
    $scope  = $rootScope.$new();
    element = $compile('<kiosk-header></kiosk-header>')($scope);
    $templateCache.put('/views/kiosk/header.html', __html__['src/kiosk/views/header.html']);
  }));

  it('is empty if kiosk is disabled', function () {
    kiosk.enabled = false;
    $scope.$digest();
    expect(element.children()).to.be.empty;
  });

  it('is visible if kiosk is enabled', function () {
    kiosk.enabled = true;
    $scope.$digest();
    expect(element.children()).to.not.be.empty;
  });

  it('can trigger a reset', function () {
    kiosk.enabled = true;
    sinon.stub(kiosk, 'reset');
    $scope.$digest();
    element.find('button').triggerHandler('click');
    expect(kiosk.reset).to.have.been.called;
  });

};
