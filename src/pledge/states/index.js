'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
    .state('pledge', {
      url: '/pledges',
      template: '<ui-view class="full-height"/>',
      abstract: true,
      parent: 'app'
    })
    .state('pledge.create', require('./create'))
    .state('pledge.confirmation', require('./confirmation'));
};
module.exports.$inject = ['$stateProvider'];
