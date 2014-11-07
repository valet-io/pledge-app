'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
    .state('campaign', {
      abstract: true,
      url: '/campaigns/:id',
      template: '<div ui-view></div>',
      resolve: {
        campaign: [
          'Campaign',
          '$stateParams',
          function (Campaign, $stateParams) {
            return new Campaign({id: $stateParams.id}).fetch();
          }
        ]
      },
      controller: 'CampaignController'
    });
};

module.exports.$inject = ['$stateProvider'];
