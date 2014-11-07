'use strict';

module.exports = function ($scope, syncLoaded) {
  syncLoaded($scope);
};

module.exports.$inject = ['$scope', 'syncLoaded'];
