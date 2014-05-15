module.exports = function ($scope, Pledge, Campaign, $state) {

  Campaign
    .active()
    .then(function (campaign) {
      $scope.pledge = new Pledge({
        campaign_id: campaign.id
      },
      {
        withRelated: ['donor']
      });
    });

  $scope.submit = function () {
    return $scope.pledge.save({
      withRelated: 'donor'
    })
    .then(function () {
      $state.go('pledge.payment-options');
    })
  };
};