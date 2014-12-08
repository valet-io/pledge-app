'use strict';

module.exports = function (kiosk) {
  return {
    restrict: 'EA',
    templateUrl: '/views/kiosk/header.html',
    link: function (scope) {
      scope.kiosk = kiosk;
    }
  };
};
module.exports.$inject = ['kiosk'];
