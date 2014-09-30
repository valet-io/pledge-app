'use strict';

module.exports = function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('404', {
    url: '/404',
    template: 'Not Found'
  });
  $urlRouterProvider.otherwise('/404');
};

module.exports.$inject = ['$stateProvider', '$urlRouterProvider'];
