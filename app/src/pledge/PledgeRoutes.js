module.exports = function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('pledge', {
    url: '/pledge',
    template: require('./PledgeForm.html')
  });
  $urlRouterProvider.when('', '/pledge');
};