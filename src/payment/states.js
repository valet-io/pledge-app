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
  return new Pledge({
    id: $stateParams.pledge
  })
  .$fetch({
    expand: ['donor']
  });
}
pledge.$inject = ['Pledge', '$stateParams'];

function payment (Payment, $stateParams) {
  return new Payment({
    id: $stateParams.id
  })
  .$fetch({
    expand: ['pledge', 'pledge.donor']
  });
}
payment.$inject = ['Payment', '$stateParams'];
