'use strict';

module.exports = function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('pledge', {})
    .state('pledge.create', {
      url: '/pledge',
      templateUrl: 'pledge/PledgeForm.html',
      controller: 'PledgeController',
      resolve: {
        campaign: function (Campaign) {
          return Campaign.active();
        }
      }
    });

  $urlRouterProvider.when('', '/pledge');
};