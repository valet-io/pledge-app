'use strict';

var Firebase = require('Firebase');

var defaultFields = ['name', 'phone', 'amount'];

module.exports = function (ConvexModel) {
  return ConvexModel.extend({
    $name: 'campaign',
    total: function () {
      if (!this.$$aggregates) return 0;
      var pledgeTotal = this.$$aggregates.total || 0;
      var startingValue = (this.$$options && this.$$options.starting_value) || 0;
      return pledgeTotal + startingValue;
    }
  })
  .hasMany('Pledge', 'pledges');
};

module.exports.$inject = ['ConvexModel'];
