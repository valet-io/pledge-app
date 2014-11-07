'use strict';

exports.Create = function ($scope, $state, pledge) {
  $scope.payment = pledge.payments.$new();
  $scope.pledge = pledge;
  $scope.donor = pledge.donor;
  
  $scope.process = function () {
    if ($scope.paymentForm.submission.failed) {
      $scope.payment = $scope.payment.$clone();
    }
    return $scope.payment.tokenize()
      .then(function (payment) {
        return payment.$batch(function (batch) {
          return batch.all([
            payment.$save({batch: batch}),
            $scope.donor.$save({batch: batch})
          ]);
        });
      })
      .then(function () {
        $state.go('^.receipt', {
          id: $scope.payment.id
        });
      });
  };
};
exports.Create.$inject = ['$scope', '$state', 'pledge'];

exports.Receipt = function ($scope, payment, $stateParams, $state, $timeout) {
  $scope.payment = payment;
  $scope.pledge = payment.pledge;
  $scope.donor = payment.pledge.donor;

  if ($stateParams.kiosk) {
    $timeout(function () {
      $state.go('pledge.create', {
        campaign: payment.pledge.campaign_id
      });
    }, 3000);
  }
};
exports.Receipt.$inject = [
  '$scope',
  'payment',
  '$stateParams',
  '$state',
  '$timeout'
];
