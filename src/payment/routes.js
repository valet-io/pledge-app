'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
    .state('payment', {
      url: '/payment',
      template: '<ui-view/>',
      abstract: true
    })
    .state('payment.create', {
      url: '/create?pledge',
      templateUrl: '/views/payment/create.html',
      controller: 'PaymentCreateController',
      resolve: require('./controllers/create').resolve
    })
    .state('payment.receipt', {
      url: '/payment/:id',
      templateUrl: '/views/payment/receipt.html',
      controller: 'PaymentReceiptController',
      resolve: require('./controllers/receipt').resolve
    });
};
