'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
    .state('pledge', {
      url: '/pledges',
      template: '<ui-view />',
      abstract: true
    })
    .state('pledge.create', {
      url: '/create?campaign',
      templateUrl: '/views/pledge/create.html',
      controller: 'PledgeCreateController'
    })
    .state('pledge.confirmation', {
      url: '/:id',
      templateUrl: '/views/pledge/confirmation.html',
      controller: 'PledgeConfirmationController',
      resolve: require('./controllers/confirmation').resolve
    });
};
