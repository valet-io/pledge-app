'use strict';

var angular = require('angular');

module.exports = function ($scope, pledge, Payment, $q, $http) {
  var payment = $scope.payment = new Payment({
    amount: pledge.amount
  });
  payment.process = function () {
    $scope.processing = true;
    return payment.createToken()
      .then(function () {
        return $http.post('http://api.valet.io/payments', {
          token: payment.token,
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
      })
      .then(function () {
        $scope.error = false;
        $scope.success = true;
      })
      .catch(function () {
        $scope.error = true;
      })
      .finally(function () {
        $scope.processing = false;
      });
  };
};