module.exports = function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('pledge', {
    url: '/pledge',
    template: 'pledge/PledgeForm.html'
  });
  $urlRouterProvider.when('', '/pledge');
};