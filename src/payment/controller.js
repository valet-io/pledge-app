'use strict';

var angular = require('angular');

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
