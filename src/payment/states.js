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
        pledge: pledge,
        payment: createPayment
      }
    })
    .state('payment.receipt', {
      url: '/:id',
      templateUrl: '/views/payment/receipt.html',
      controller: 'PaymentReceiptController',
      resolve: {
        payment: getPayment
      }
    });
};
module.exports.$inject = ['$stateProvider'];

function pledge (Pledge, $stateParams) {
  return new Pledge({
    id: $stateParams.pledge
  })
  .$fetch({
    expand: ['donor', 'campaign.organization.stripe']
  });
}
pledge.$inject = ['Pledge', '$stateParams'];

function createPayment (pledge) {
  return pledge.payments.$new({
    $key: pledge.campaign.organization.stripe.publishable_key
  });
}
createPayment.$inject = ['pledge'];

function getPayment (Payment, $stateParams) {
  var newPayment = new Payment({
    id: $stateParams.id
  });
  if (newPayment.pledge && newPayment.pledge.donor) {
    return newPayment;
  }
  else {
    return newPayment.$fetch({
      expand: ['pledge', 'pledge.donor']
    });
  }
}
getPayment.$inject = ['Payment', '$stateParams'];
