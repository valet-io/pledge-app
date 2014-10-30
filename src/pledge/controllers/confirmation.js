'use strict';

module.exports = function ($scope, pledge, $timeout, $state) {
  $scope.pledge = pledge;

  if (pledge.campaign.payments) {
    $timeout(function () {
      $state.go('payment.create', {
        pledge: pledge.id
      });
    }, 3000);
  }
};

module.exports.$inject = ['$scope', 'pledge', '$timeout', '$state'];

var resolve = module.exports.resolve = {
  pledge: function (Pledge, $stateParams) {
    return new Pledge({id: $stateParams.id}).$fetch({
      expand: ['donor', 'campaign']
    });
  }
};

resolve.pledge.$inject = ['Pledge', '$stateParams'];
