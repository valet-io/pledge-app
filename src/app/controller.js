'use strict';

module.exports = function ($scope) {
  $scope.$on('$stateChangeStart', function () {
    $scope.loaded = false;
  });
  $scope.$on('$stateChangeSuccess', function () {
    $scope.loaded = true;
  });
  $scope.$on('$stateChangeError', function () {
    $scope.loaded = true;
  });
};
