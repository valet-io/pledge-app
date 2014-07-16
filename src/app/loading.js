'use strict';

var angular = require('angular');

module.exports = function () {
  return {
    link: function (scope, element, attributes) {
      var wrapper = angular.element('<div></div>');
      element.contents().wrap(wrapper);
      wrapper.css('display', 'none');
      var loading = angular.element('<div class="loading-indicator-content">' + 
        '<div class="circle circle-1"></div>' +
        '<div class="circle circle-2"></div>' +
        '<div class="circle circle-3"></div>' +
      '</div>');
      element.prepend(loading);
      scope[attributes.promise].then(function () {
        wrapper.css('display', 'block');
        loading.remove();
      });        
    },

  };
};
