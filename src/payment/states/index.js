'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
    .state('payment', {
      url: '/payments',
      template: '<ui-view class="full-height"/>',
      abstract: true,
      parent: 'app'
    })
    .state('payment.create', require('./create'))
    .state('payment.receipt', require('./receipt'));
};
module.exports.$inject = ['$stateProvider'];
