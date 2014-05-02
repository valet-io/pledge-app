module.exports = function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('pledge', {
    url: '/pledge',
    template: 'pledge here'
  });
  $urlRouterProvider.when('', '/pledge');
};