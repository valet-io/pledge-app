'use strict';

module.exports = function (ConvexModel) {
  return ConvexModel.$new({
    name: 'pledge'
  })
  .belongsTo('Donor')
  .belongsTo('Payment');
};
