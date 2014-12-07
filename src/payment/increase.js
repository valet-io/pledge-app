'use strict';

var round = require('round');

module.exports = function () {
  return {
    restrict: 'E',
    templateUrl: '/views/payment/increase.html',
    scope: {
      pledge: '='
    },
    controller: IncreaseController
  };
};

function IncreaseController ($scope, $window, $exceptionHandler) {
  $scope.$watch('pledge.amount', function (value) {
    if (value) {
      var multipliers, interval;
      if (value < 100) {
        multipliers = [.5, 1];
        interval = 5;
      }
      else {
        multipliers = [.1, .25];
        interval = round(value / 10, 5);
      }
      $scope.amounts = multipliers.map(function (multiplier) {
        return value * multiplier;
      })
      .map(function (increase) {
        return round.up(increase, interval);
      })
      .reduce(function (acc, option) {
        if (acc.indexOf(option) === -1) {
          acc.push(option);
        }
        return acc;
      }, [])
    }
  });
  $scope.increase = function (amount) {
    $scope.pledge.amount += amount;
    $scope.pledge.$save().catch($exceptionHandler);
  };
  $scope.set = function () {
    var increase = $window.prompt('Enter an amount to add to your existing pledge');
    if (increase === null) return;
    increase = parseInt(increase);
    if (isNaN(increase) || increase < 0) return;
    $scope.increase(increase);
  };
}
IncreaseController.$inject = ['$scope', '$window', '$exceptionHandler'];
