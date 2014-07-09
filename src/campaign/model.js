'use strict';

var Firebase = require('Firebase');

module.exports = function (BaseModel, $firebase, $q, config) {
  var Campaign = BaseModel
    .extend({
      objectName: 'campaigns',
      total: function () {
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

  return Campaign;
};
