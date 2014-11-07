'use strict';

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
        campaign: campaign
      }
    })
    .state('pledge.confirmation', {
      url: '/:id',
      templateUrl: '/views/pledge/confirmation.html',
      controller: 'PledgeConfirmationController',
      resolve: {
        pledge: pledge
      }
    });
};

module.exports.$inject = ['$stateProvider'];

function campaign  (Campaign, $stateParams) {
  return new Campaign({id: $stateParams.campaign}).$fetch();
};
campaign.$inject = ['Campaign', '$stateParams'];

function pledge (Pledge, $stateParams) {
  var pledge = new Pledge({id: $stateParams.id});
  if (pledge.donor && pledge.campaign) {
    return pledge;
  }
  else {
    return pledge.$fetch({
      expand: ['donor', 'campaign']
    });
  }
};
pledge.$inject = ['Pledge', '$stateParams'];
