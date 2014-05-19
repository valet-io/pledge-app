'use strict';

module.exports = function (BaseModel, Stripe) {
  return BaseModel.extend({
    objectName: 'payment',
    token: function () {
      var payment = this;
      return Stripe.card.createToken(payment.card)
        .then(function (token) {
          payment.token = token.id;
          return payment;
        });
    }
  });
};