'use strict';

module.exports = function (ConvexModel) {
  var Campaign = ConvexModel.extend({
    $name: 'campaign',
    $$aggregates: {
      total: 0,
      count: 0
    },
    $$options: {
      starting_value: 0
    }
  })
  .hasMany('Pledge', 'pledges');

  Object.defineProperties(Campaign.prototype, {
    total: {
      get: function () {
        return this.$$aggregates.total + this.$$options.starting_value;
      }
    },
    count: {
      get: function () {
        return this.$$aggregates.count;
      }
    }
  });

  return Campaign;
};

module.exports.$inject = ['ConvexModel'];
