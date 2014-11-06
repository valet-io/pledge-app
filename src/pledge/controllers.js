'use strict';

exports.Create = function ($scope, $state, campaign) {
  $scope.campaign = campaign;
  $scope.firebase = campaign.$subscribe(['aggregates', 'options'], true);
  $scope.pledge = campaign.pledges.$new({
    donor: {}
  });

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
exports.Create.$inject = ['$scope', '$state', 'campaign'];


exports.getCampaign = function (Campaign, $stateParams) {
  return new Campaign({id: $stateParams.campaign}).$fetch();
};
exports.getCampaign.$inject = ['Campaign', '$stateParams'];


exports.Confirmation = function ($scope, pledge, $timeout, $state) {
  $scope.pledge = pledge;
  $timeout(function () {
    $state.go('payment.create', {
      pledge: pledge.id
    });
  }, 3000);
};
exports.Confirmation.$inject = ['$scope', 'pledge', '$timeout', '$state'];

exports.getPledge = function (Pledge, $stateParams) {
  return new Pledge({id: $stateParams.id}).$fetch({
    expand: ['donor', 'campaign']
  });
};
exports.getPledge.$inject = ['Pledge', '$stateParams'];
