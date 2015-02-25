'use strict';

exports.Create = function ($scope, $state, $stateParams, campaign, pledge) {
  $scope.campaign = campaign;
  $scope.firebase = campaign.$subscribe(['aggregates', 'options'], true);
  $scope.pledge = pledge;

  $scope.submit = function () {
    return $scope.pledge.$batch(function (batch) {
      batch.parallel(false);
      return batch.all([
        $scope.pledge.donor.$save({batch: batch}),
        $scope.pledge.$save({batch: batch})
      ]);
    })
    .then(function () {
      $state.go('^.confirmation', {
        id: $scope.pledge.id
      });
    });
  };  
};
exports.Create.$inject = ['$scope', '$state', '$stateParams', 'campaign', 'pledge'];

exports.Confirmation = function ($scope, pledge, $timeout, $state, CountdownTimer) {
  $scope.pledge = pledge;
  $scope.timer = new CountdownTimer(3000).start();
  $scope.timer.then(function () {
    return $state.go('payment.create', {
      pledge: pledge.id
    });
  });
  $scope.$on('$destroy', function () {
    $scope.timer.cancel();
  });  
};
exports.Confirmation.$inject = ['$scope', 'pledge', '$timeout', '$state', 'CountdownTimer'];
