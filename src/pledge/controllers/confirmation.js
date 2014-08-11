'use strict';

module.exports = function ($scope, pledge, $timeout, $state) {
  $scope.pledge = pledge;

  $timeout(function () {
    $state.go('payment.create', {
      pledge: pledge.id
    });
  }, 5000);
};

module.exports.resolve = {
  pledge: [
    'Pledge',
    '$stateParams',
    function (Pledge, $stateParams) {
      return new Pledge({id: $stateParams.id}).fetch({
        expand: ['donor']
      });
    }
  ]
};
