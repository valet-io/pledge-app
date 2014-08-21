'use strict';

module.exports = function ($scope, $state, pledge, Payment) {
  $scope.payment = new Payment({
    amount: pledge.amount,
    pledge_id: pledge.id
  });
  $scope.pledge = pledge;
  $scope.donor = pledge.donor;
  
  $scope.process = function () {
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

module.exports.$inject = ['$scope', '$state', 'pledge', 'Payment'];

module.exports.resolve = {
  pledge: [
    'Pledge',
    '$stateParams',
    function (Pledge, $stateParams) {
      return new Pledge({
        id: $stateParams.pledge
      })
      .$fetch({
        expand: ['donor']
      });
    }
  ]
};
