'use strict';

var angular = require('angular');

module.exports = function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '?kiosk',
      templateUrl: '/views/app/main.html',
      controller: ['kiosk', angular.noop],
      abstract: true
    })
    .state('app.404', {
      url: '/404',
      template: 'Not Found'
    });
  $urlRouterProvider.otherwise('/404');
};
module.exports.$inject = ['$stateProvider', '$urlRouterProvider'];
