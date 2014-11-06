'use strict';

var controllers = require('./controllers');

module.exports = function ($stateProvider) {
  $stateProvider
    .state('pledge', {
      url: '/pledges',
      template: '<ui-view />',
      abstract: true,
      parent: 'app'
    })
    .state('pledge.create', {
      url: '/create?campaign',
      templateUrl: '/views/pledge/create.html',
      controller: 'PledgeCreateController',
      resolve: {
        campaign: controllers.getCampaign
      }
    })
    .state('pledge.confirmation', {
      url: '/:id',
      templateUrl: '/views/pledge/confirmation.html',
      controller: 'PledgeConfirmationController',
      resolve: {
        pledge: controllers.getPledge
      }
    });
};

module.exports.$inject = ['$stateProvider'];
