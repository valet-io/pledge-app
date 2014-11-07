'use strict';

var angular = require('angular');

module.exports = function () {
  
  it('calls syncLoaded on the scope', angular.mock.inject(function ($injector) {
    var scope = $injector.get('$rootScope').$new();
    var sync = sinon.spy();
    $injector.get('$controller')('AppController', {
      $scope: scope,
      syncLoaded: sync
    });
    expect(sync).to.have.been.calledWith(scope);
  }));
};
