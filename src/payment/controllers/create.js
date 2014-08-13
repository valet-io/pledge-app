'use strict';

module.exports = function ($scope, pledge, Payment, $q, $http) {
  var payment = $scope.payment = new Payment({
    amount: pledge.amount
  });
  payment.process = function () {
    return payment.tokenize()
      .then(function (token) {
        return $http.post(pledge.baseURL + '/batch', {
          requests: [
            {
              method: 'post',
              path: '/payments',
              payload: {
                token: token.id,
                amount: payment.amount,
                pledge_id: pledge.id
              }
            }
          ]
        });
      });
  };
};

module.exports.resolve = {
  pledge: [
    'Pledge',
    '$stateParams',
    function (Pledge, $stateParams) {
      return new Pledge({
        id: $stateParams.pledge
      })
      .$fetch();
    }
  ]
};
