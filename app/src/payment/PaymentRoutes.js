'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
    .state('payment', {
      url: '/payment/:pledgeId',
      templateUrl: 'payment/PaymentForm.html',
      controller: 'PaymentController',
      resolve: {
        pledge: function (Pledge, $stateParams) {
          return new Pledge({
            id: $stateParams.pledgeId
          })
          .fetch();
        }
      }
    });
};