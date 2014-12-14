'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
    .state('pledge', {
      url: '/pledges',
      template: '<ui-view class="full-height"/>',
      abstract: true,
      parent: 'app'
    })
    .state('pledge.create', {
      url: '/create?campaign&{test:bool}',
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
  return new Campaign({id: $stateParams.campaign}).$active().$fetch();
}
campaign.$inject = ['Campaign', '$stateParams'];

function pledge (Pledge, $stateParams) {
  var newPledge = new Pledge({id: $stateParams.id});
  if (newPledge.donor && newPledge.campaign) {
    return newPledge;
  }
  else {
    return newPledge.$fetch({
      expand: ['donor', 'campaign']
    })
    .then(function (pledge) {
      pledge.campaign.$active();
      return pledge;
    });
  }
}
pledge.$inject = ['Pledge', '$stateParams'];
