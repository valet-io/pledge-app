'use strict';

var angular = require('angular');

module.exports = function ($scope, pledge, Payment, $q, $http) {
  var payment = $scope.payment = new Payment({
    amount: pledge.amount
  });
  payment.process = function () {
    return payment.tokenize()
      .then(function (token) {
        return $http.post('http://api.valet.io/payments', {
          token: token.id,
          amount: payment.amount,
          email: payment.email,
          street: payment.address.street,
          zip: payment.address.zip
        });
      })
      .then(function (response) {
        return response.data;
      })
      .then(function (payment) {
        return $http.put('http://api.valet.io/pledges/' + pledge.id, {
          id: pledge.id,
          payment_id: payment.id
        });
      });
  };
};
