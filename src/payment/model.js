'use strict';

module.exports = function (ConvexModel, stripe) {
  return ConvexModel.extend({
    $name: 'payment',
    tokenize: function () {
      return stripe.card.createToken(this.card);
    },
    toJSON: function () {
      var json = ConvexModel.prototype.toJSON.call(this);
      delete json.card;
      if (!json.street2) {
        json.street2 = void 0;
      }
      return json;
    }
  })
  .belongsTo('Pledge');
};
