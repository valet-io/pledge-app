'use strict';

module.exports = function ($rootScope, $stateParams, $state, Campaign) {
  var kiosk = {};
  $rootScope.$watch(function () {
    return $stateParams.kiosk;
  }, function (value) {
    kiosk.enabled = !!value;
  });
  kiosk.reset = function () {
    if (!kiosk.enabled) return;
    return $state.go('pledge.create', {
      campaign: Campaign.active.id
    },
    {
      reload: true
    });
  };
  return kiosk;
};
module.exports.$inject = ['$rootScope', '$stateParams', '$state', 'Campaign'];
