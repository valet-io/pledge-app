'use strict';

module.exports = function ($scope, pledge, Payment, $q, $http) {
  var payment = $scope.payment = new Payment({
    amount: pledge.amount
  });
  payment.process = function () {
    return payment.tokenize()
      .then(function (token) {
        return $http.post(pledge.baseURL + '/payments', {
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
        pledge.payment_id = payment.id;
        return pledge.save();
      });
  };
};
