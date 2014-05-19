'use strict';

var angular = require('angular');

module.exports = function ($scope, pledge, Payment) {
  var payment = $scope.payment = new Payment({
    amount: pledge.amount
  });
  payment.process = function () {
    return payment.token()
      .then(function () {
        payment = angular.copy(payment);
        delete payment.card;
        return payment.save();
      })
      .then(function (payment) {
        pledge.payment_id = payment.id;
        return pledge.save();
      });
  };
};