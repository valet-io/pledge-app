'use strict';

module.exports = function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '?kiosk',
      template: '<ui-view/>',
      abstract: true
    })
    .state('app.404', {
      url: '/404',
      template: 'Not Found'
    });
  $urlRouterProvider.otherwise('/404');
};
module.exports.$inject = ['$stateProvider', '$urlRouterProvider'];
