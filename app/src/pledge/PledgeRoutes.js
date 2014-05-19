'use strict';

module.exports = function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('pledge', {
      url: '/pledge',
      templateUrl: 'pledge/PledgeForm.html',
      controller: 'PledgeController',
      resolve: {
        campaign: function (Campaign) {
          return {id: 0};
        }
      }
    });

  $urlRouterProvider.when('', '/pledge');
};