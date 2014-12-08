'use strict';

exports.Create = function ($scope, $state, pledge, payment) {
  $scope.payment = payment;
  $scope.pledge = pledge;
  $scope.donor = pledge.donor;

  $scope.updatePledgeAmount = function (value) {
    if (value) {
      $scope.pledge.amount = value;
      $scope.pledge.$save();
    }
  };
  
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

exports.Receipt = function ($scope, payment, $stateParams, $state, $timeout) {
  $scope.payment = payment;
  $scope.pledge = payment.pledge;
  $scope.donor = payment.pledge.donor;

  if ($stateParams.kiosk) {
    $timeout(function () {
      $state.go('pledge.create', {
        campaign: payment.pledge.campaign.id
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
