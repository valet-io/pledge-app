'use strict';

var angular = require('angular');

module.exports = function (ConvexModel, stripe) {
  var Payment = ConvexModel.extend({
    $name: 'payment',
    tokenize: function () {
      var self = this;
      return stripe.card.createToken(this.card)
        .then(function (token) {
          self.token = token.id;
          return self;
        });
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
  .belongsTo('Pledge', 'pledge');

  Object.defineProperty(Payment.prototype, 'amount', {
    enumerable: true,
    get: function () {
      return this.pledge.amount;
    },
    set: angular.noop
  });

  return Payment;
};
module.exports.$inject = ['ConvexModel', 'stripe'];
