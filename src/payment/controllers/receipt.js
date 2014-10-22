'use strict';

module.exports = function ($scope, payment, $stateParams, $state, $timeout) {
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

module.exports.$inject = ['$scope', 'payment', '$stateParams', '$state', '$timeout'];

module.exports.resolve = {
  payment: [
    'Payment',
    '$stateParams',
    function (Payment, $stateParams) {
      return new Payment({
        id: $stateParams.id
      })
      .$fetch({
        expand: ['pledge', 'pledge.donor']
      });
    }
  ]
};
