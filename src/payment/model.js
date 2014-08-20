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
      return json;
    }
  })
  .belongsTo('Pledge');
};
