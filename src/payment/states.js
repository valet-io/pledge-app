'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
    .state('payment', {
      url: '/payments',
      template: '<ui-view/>',
      abstract: true,
      parent: 'app'
    })
    .state('payment.create', {
      url: '/create?pledge',
      templateUrl: '/views/payment/create.html',
      controller: 'PaymentCreateController',
      resolve: {
        pledge: pledge
      }
    })
    .state('payment.receipt', {
      url: '/:id',
      templateUrl: '/views/payment/receipt.html',
      controller: 'PaymentReceiptController',
      resolve: {
        payment: payment
      }
    });
};
module.exports.$inject = ['$stateProvider'];

function pledge (Pledge, $stateParams) {
  var pledge = new Pledge({
    id: $stateParams.pledge
  });
  if (pledge.donor) {
    return pledge;
  }
  else {
    return pledge.$fetch({
      expand: ['donor']
    });
  }
}
pledge.$inject = ['Pledge', '$stateParams'];

function payment (Payment, $stateParams) {
  var payment = new Payment({
    id: $stateParams.id
  });
  if (payment.pledge && payment.pledge.donor) {
    return payment;
  }
  else {
    return payment.$fetch({
      expand: ['pledge', 'pledge.donor']
    });
  }
}
payment.$inject = ['Payment', '$stateParams'];
