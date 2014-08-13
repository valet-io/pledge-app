'use strict';

module.exports = function (ConvexModel, stripe) {
  return ConvexModel.$new({
    name: 'payment',
    tokenize: function () {
      return stripe.card.createToken(this.card);
    }
  });
};
