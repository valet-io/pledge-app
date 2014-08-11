'use strict';

module.exports = function ($scope, pledge) {
  $scope.pledge = pledge;
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
