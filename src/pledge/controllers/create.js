'use strict';

var angular = require('angular');

module.exports = function ($scope, Pledge, campaign, $state, $http) {

  $scope.pledge = new Pledge({campaign_id: campaign.id, anonymous: false}, {withRelated: ['donor']});

  $scope.submit = function () {
    var pledge = angular.copy($scope.pledge);
    delete pledge.donor;
    pledge.donor_id = '$$0.id';
    return $http.post(pledge.baseURL + '/batch', {
      requests: [
        {
          method: 'post',
          path: '/donors',
          payload: $scope.pledge.donor
        },
        {
          method: 'post',
          path: '/pledges',
          payload: pledge,
          references: ['payload']
        }
      ]
    })
    .then(function (res) {
      return angular.extend($scope.pledge, res.data[1]);
    })
    .then(function (pledge) {
      $state.go('payment', {
        pledgeId: pledge.id
      });
    });
  };
  
};
