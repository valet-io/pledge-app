'use strict';

module.exports = {
  url: '/create?pledge',
  templateUrl: '/views/payment/create.html',
  controller: 'PaymentCreateController',
  resolve: {
    pledge: getPledge,
    payment: newPayment
  }
};

function getPledge (Pledge, live, $stateParams) {
  return new Pledge({
    id: $stateParams.pledge
  })
  .$fetch({
    expand: ['donor', 'campaign.organization.stripe']
  })
  .then(function (pledge) {
    pledge.campaign.$active();
    live.enabled(pledge.live);
    return pledge;
  });
}
getPledge.$inject = ['Pledge', 'live', '$stateParams'];

function newPayment (pledge, stripeKey) {
  return pledge.payments.$new({
    $key: stripeKey.get(pledge.campaign.organization),
    live: pledge.live
  });
}
newPayment.$inject = ['pledge', 'stripeKey'];
