'use strict';

module.exports = function ($scope, Pledge, campaign, $state) {

  $scope.pledge = new Pledge({campaign_id: campaign.id}, {withRelated: ['donor']});

  $scope.submit = function () {
    return $scope.pledge.save({
      withRelated: ['donor']
    })
    .then(function (pledge) {
      $state.go('payment-options', {
        pledgeId: pledge.id
      });
    });
  };
  
};
