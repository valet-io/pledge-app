'use strict';

module.exports = function ($scope, $state, Pledge, campaign) {
  $scope.firebase = campaign.listen();
  $scope.campaign = campaign;
  campaign.pledges.$push({
    donor: {}
  });
  $scope.pledge = campaign.pledges[0];

  $scope.submit = function () {
    return $scope.pledge.$batch(function (batch) {
      batch.parallel(false);
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

var resolve = module.exports.resolve = {};

resolve.campaign = function (Campaign, $stateParams) {
  return new Campaign({id: $stateParams.campaign}).$fetch();
};

resolve.campaign.$inject = ['Campaign', '$stateParams'];
