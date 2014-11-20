'use strict';

exports.Create = function ($scope, $state, campaign) {
  $scope.campaign = campaign;
  $scope.firebase = campaign.$subscribe(['aggregates', 'options'], true);
  $scope.pledge = campaign.pledges.$new({
    donor: {}
  });

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
exports.Create.$inject = ['$scope', '$state', 'campaign'];

exports.Confirmation = function ($scope, pledge, $timeout, $state) {
  $scope.pledge = pledge;
  var timer = $timeout(function () {
    $state.go('payment.create', {
      pledge: pledge.id
    });
  }, 3000);
  $scope.$on('$destroy', function () {
    $timeout.cancel(timer);
  });
};
exports.Confirmation.$inject = ['$scope', 'pledge', '$timeout', '$state'];
