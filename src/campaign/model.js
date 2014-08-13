'use strict';

var Firebase = require('Firebase');

module.exports = function (ConvexModel, $firebase, $q, config) {
  return ConvexModel.$new({
    name: 'campaign',
    total: function () {
      if (!this.firebase) return 0;
      var pledgeTotal = this.firebase.aggregates && this.firebase.aggregates.total || 0;
      var startingValue = this.firebase.options && this.firebase.options.startingValue || 0;
      return pledgeTotal + startingValue;
    },
    listen: function () {
      var self = this;
      var deferred = $q.defer();
      this.firebase = $firebase(new Firebase(config.firebase.endpoint + '/campaigns/' + this.id));
      this.firebase.$on('loaded', function () {
        deferred.resolve(self);
      });
      return deferred.promise;
    }
  });
};
