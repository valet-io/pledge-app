'use strict';

module.exports = function ($scope, campaign, $timeout) {
  $scope.campaign = campaign;
  $scope.firebase = campaign.listen();
};
