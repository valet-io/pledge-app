'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
    .state('campaign', {
      abstract: true,
      url: '/campaigns/:id',
      template: '<ui-view/>',
      resolve: {
        campaign: [
          'Campaign',
          '$stateParams',
          function (Campaign, $stateParams) {
            return new Campaign({id: $stateParams.id}).fetch();
          }
        ]
      },
      controller: [
        '$scope',
        'campaign',
        require('./controller')
      ]
    });
};
