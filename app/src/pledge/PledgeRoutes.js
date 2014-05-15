module.exports = function ($stateProvider, $urlRouterProvider) {

  $stateProvider.state('pledge', {
    url: '/pledge',
    templateUrl: 'pledge/PledgeForm.html',
    controller: 'PledgeController'
  });

  $urlRouterProvider.when('', '/pledge');
};