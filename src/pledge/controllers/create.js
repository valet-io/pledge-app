'use strict';

module.exports = function ($scope, $state, Pledge, campaign) {
  $scope.firebase = campaign.listen();
  $scope.campaign = campaign;
  $scope.pledge = new Pledge({campaign_id: campaign.id, anonymous: false}, {expand: ['donor']});
  
  // temporary, refactoring convex relations to handle automatically
  $scope.pledge.donor_id = $scope.pledge.donor.id;

  $scope.submit = function () {
    return $scope.pledge.$batch(function (batch) {
      batch.parallel = false;
      $scope.pledge.donor.$save({batch: batch});
      $scope.pledge.$save({batch: batch}).then(function () {
        $state.go('^.confirmation', {
          id: $scope.pledge.id
        });
      });
    });
  };
  
};

module.exports.$inject = ['$scope', '$state', 'Pledge', 'campaign'];

module.exports.resolve = {
  campaign: [
    'Campaign',
    '$stateParams',
    function (Campaign, $stateParams) {
      return new Campaign({id: $stateParams.campaign}).$fetch();
    }
  ]
};
