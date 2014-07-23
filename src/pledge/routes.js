'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
    .state('pledge', {
      parent: 'campaign',
      url: '/pledge',
      templateUrl: '/views/pledge/form.html',
      controller: 'PledgeController'
    })
    .state('payment-options', {
      url: '/payment-options/:pledgeId',
      templateUrl: '/views/pledge/options.html',
      controller: 'PaymentOptionsController'
    });
};
