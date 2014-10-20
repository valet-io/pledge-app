'use strict';

module.exports = function (ConvexModel, stripe) {
  return ConvexModel.$new({
    name: 'payment',
    tokenize: function () {
      return stripe.card.createToken(this.card);
    },
    toJSON: function () {
      var json = ConvexModel.prototype.toJSON.call(this);
      delete json.card;
      if (!payment.street2) {
        payment.street2 = void 0;
      }
      return json;
    }
  })
  .belongsTo('Pledge');
};
