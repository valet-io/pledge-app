'use strict';

module.exports = function (BaseModel, stripe) {
  return BaseModel.extend({
    objectName: 'payment',
    tokenize: function () {
      return stripe.card.createToken(this.card);
    }
  });
};
