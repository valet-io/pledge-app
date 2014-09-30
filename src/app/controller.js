'use strict';

module.exports = function ($scope, $state) {
  $scope.$on('$stateChangeStart', function () {
    $scope.loaded = false;
  });
  $scope.$on('$stateChangeSuccess', function () {
    $scope.loaded = true;
  });
};

module.exports.$inject = ['$scope', '$state'];
