'use strict';

module.exports = {
  url: '/:id',
  templateUrl: '/views/pledge/confirmation.html',
  controller: 'PledgeConfirmationController',
  resolve: {
    pledge: getPledge
  }
};

function getPledge (Pledge, live, $stateParams) {
  var pledge = new Pledge({id: $stateParams.id});
  if (pledge.donor && pledge.campaign) {
    return pledge;
  }
  else {
    return pledge.$fetch({
      expand: ['donor', 'campaign']
    })
    .then(function (pledge) {
      live.enabled(pledge.live);
      pledge.campaign.$active();
      return pledge;
    });
  }
}
getPledge.$inject = ['Pledge', 'live', '$stateParams'];
