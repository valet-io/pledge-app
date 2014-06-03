'use strict';

module.exports = function ($scope, Pledge, campaign, $state) {

  $scope.pledge = new Pledge({campaign_id: campaign.id}, {withRelated: ['donor']});

  $scope.submit = function () {
    $scope.saving = true;
    return $scope.pledge.save({
      withRelated: ['donor']
    })
    .then(function (pledge) {
      $scope.saving = false;
      $state.go('payment-options', {
        pledgeId: pledge.id
      });
    })
    .catch(function () {
      $scope.error = true;
      $scope.saving = false;
    })
  };
  
};