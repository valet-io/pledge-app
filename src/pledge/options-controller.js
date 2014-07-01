'use strict';

module.exports = function ($scope, $state, $stateParams) {
  $scope.pay = function () {
    $state.go('payment', {
      pledgeId: $stateParams.pledgeId
    });
  };
};
