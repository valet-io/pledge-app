'use strict';

var angular = require('angular');

module.exports = function () {
  return {
    scope: {
      promise: '='
    },
    transclude: true,
    template: '<div class="loading-indicator-content" ng-hide="loaded">' + 
      '<div class="circle circle-1"></div>' +
      '<div class="circle circle-2"></div>' +
      '<div class="circle circle-3"></div>' +
    '</div>' +
    '<ng-transclude ng-show="loaded"></ng-transclude>',
    link: function (scope) {
      scope.promise.then(function () {
        scope.loaded = true
      });
    }
  };
};
