'use strict';

module.exports = function ($scope, payment) {
  $scope.payment = payment;
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
        expand: ['pledge']
      });
    }
  ]
};
