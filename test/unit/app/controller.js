'use strict';

var angular = require('angular');

module.exports = function () {
  
  it('calls syncLoaded on the controller', angular.mock.inject(function ($controller) {
    var sync = sinon.spy();
    var controller = $controller('AppController', {
      syncLoaded: sync
    });
    expect(sync).to.have.been.calledWith(controller);
  }));
};
