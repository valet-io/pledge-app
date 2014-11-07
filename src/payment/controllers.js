'use strict';

exports.Create = function ($scope, $state, pledge, Payment) {
  $scope.payment = pledge.payments.$new();
  $scope.pledge = pledge;
  $scope.donor = pledge.donor;
  
  $scope.process = function () {
    if ($scope.paymentForm.submission.failed) {
      $scope.payment = $scope.payment.$clone();
    }
    return $scope.payment.tokenize()
      .then(function (token) {
        $scope.payment.token = token.id;
        return $scope.payment.$batch(function (batch) {
          $scope.payment.$save({batch: batch})
            .then(function (payment) {
              $state.go('^.receipt', {
                id: payment.id
              });
            });
          $scope.donor.$save({batch: batch});
        });
      });
  };
};
exports.Create.$inject = ['$scope', '$state', 'pledge', 'Payment'];

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
