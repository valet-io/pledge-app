'use strict';

module.exports = function (ConvexModel, stripe) {
  var Payment = ConvexModel.extend({
    $name: 'payment',
    tokenize: function () {
      return stripe.card.createToken(this.card);
    },
    toJSON: function () {
      var json = ConvexModel.prototype.toJSON.call(this);
      json.card = void 0;
      if (!json.street2) {
        json.street2 = void 0;
      }
      return json;
    }
  })
  .belongsTo('Pledge');

  Object.defineProperty(Payment.prototype, 'amount', {
    enumerable: true,
    get: function () {
      return this.pledge.amount;
    }
  });

  return Payment;
};
module.exports.$inject = ['ConvexModel', 'stripe'];
