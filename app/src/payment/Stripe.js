'use strict';

var Stripe = require('stripe');

var internals = {};

internals.factory = function ($q) {
  return {
    card: {
      createToken: function (card) {
        var deferred = $q.defer();
        Stripe.card.createToken(card, function (status, response) {
          if (response.error) return deferred.reject(response.error);
          return deferred.resolve(response);
        });
        return deferred.promise;
      }
    }
  };  
};

module.exports = function () {
  this.setPublishableKey = Stripe.setPublishableKey;
  this.$get = internals.factory;
};