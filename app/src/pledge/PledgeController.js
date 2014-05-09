module.exports = function ($scope, Pledge, Campaign) {
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
};