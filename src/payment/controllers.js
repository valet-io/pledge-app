'use strict';

exports.Create = function ($scope, $state, pledge, payment) {
  $scope.payment = payment;
  $scope.pledge = pledge;
  $scope.donor = pledge.donor;
  
  $scope.process = function () {
    if ($scope.paymentForm.submission.failed) {
      $scope.payment = $scope.payment.$clone();
    }
    return $scope.payment.zipLookup({
      timeout: 1000
    })
    .catch(function () {
      return $scope.payment;
    })
    .then(function (payment) {
      return payment.tokenize();
    })
    .then(function (payment) {
      return payment.$batch(function (batch) {
        batch.parallel(false);
        return batch.all([
          $scope.donor.$save({batch: batch}),
          payment.$save({batch: batch})
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
exports.Create.$inject = ['$scope', '$state', 'pledge', 'payment'];

exports.Receipt = function ($scope, payment, kiosk, $timeout) {
  $scope.payment = payment;
  $scope.pledge = payment.pledge;
  $scope.donor = payment.pledge.donor;

  $timeout(kiosk.reset, 3000);
};
exports.Receipt.$inject = [
  '$scope',
  'payment',
  'kiosk',
  '$timeout'
];
