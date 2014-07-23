'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
    .state('payment', {
      url: '/payment/:pledgeId',
      templateUrl: '/views/payment/form.html',
      controller: 'PaymentController',
      resolve: {
        pledge: [
          'Pledge',
          '$stateParams',
          function (Pledge, $stateParams) {
            return new Pledge({
              id: $stateParams.pledgeId
            })
            .fetch();
          }
        ]
      }
    });
};
