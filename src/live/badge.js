'use strict';

module.exports = function (live) {
  return {
    restrict: 'E',
    templateUrl: '/views/live/badge.html',
    link: function ($scope) {
      $scope.live = live;
    }
  }
};
module.exports.$inject = ['live'];
