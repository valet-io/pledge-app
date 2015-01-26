'use strict';

module.exports = {
  url: '/:id',
  templateUrl: '/views/payment/receipt.html',
  controller: 'PaymentReceiptController',
  resolve: {
    payment: getPayment
  }
};

function getPayment (Payment, live, $stateParams) {
  var newPayment = new Payment({
    id: $stateParams.id
  });
  if (newPayment.pledge && newPayment.pledge.donor) {
    return newPayment;
  }
  else {
    return newPayment.$fetch({
      expand: ['pledge', 'pledge.donor']
    })
    .then(function (payment) {
      live.enabled(payment.live);
      payment.pledge.campaign.$active();
      return payment;
    });
  }
}
getPayment.$inject = ['Payment', 'live', '$stateParams'];
