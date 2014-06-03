'use strict';

module.exports = function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('pledge', {
      url: '/pledge',
      templateUrl: 'pledge/PledgeForm.html',
      controller: 'PledgeController',
      resolve: {
        campaign: function (Campaign) {
          return Campaign.active();
        }
      }
    })
    .state('payment-options', {
      url: '/payment-options/:pledgeId',
      templateUrl: 'pledge/PaymentOptions.html',
      controller: 'PaymentOptionsController'
    });

  // $urlRouterProvider.when('', '/pledge');
};