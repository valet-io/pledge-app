'use strict';

module.exports = function ($scope, payment) {
  $scope.payment = payment;
  $scope.pledge = payment.pledge;
  $scope.donor = payment.pledge.donor;
};

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
