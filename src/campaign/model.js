'use strict';

var Firebase = require('Firebase');

var defaultFields = ['name', 'phone', 'amount'];

module.exports = function (ConvexModel, $firebase, $q, config) {
  return ConvexModel.extend({
    $name: 'campaign',
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
    },
    $shows: function (field) {
      var custom = this.metadata.fields;
      var isDefault = defaultFields.indexOf(field) !== -1;
      if (!custom) return isDefault;
      if (isDefault) {
        return custom.indexOf('-' + field) === -1;
      }
      else {
        return custom.indexOf('+' + field) !== -1;
      }
    }
  })
  .hasMany('Pledge', 'pledges');
};
