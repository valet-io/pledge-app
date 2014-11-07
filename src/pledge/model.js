'use strict';

module.exports = function (ConvexModel) {
  return ConvexModel.extend({
    $name: 'pledge',
    anonymous: false
  })
  .belongsTo('Donor', 'donor')
  .belongsTo('Campaign', 'campaign')
  .hasMany('Payment', 'payments');
};

module.exports.$inject = ['ConvexModel'];
