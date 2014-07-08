var angular   = require('angular');

module.exports = function ($window) {
  return {
    link: function (scope, element, attributes) {
      $window = angular.element($window);
      $window.on('touchmove', function () {
        element.addClass(attributes.bdTouch);
      });
      $window.on('touchend', function () {
        element.removeClass(attributes.bdTouch);
      });
    }
  }
};