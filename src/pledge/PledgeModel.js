'use strict';

module.exports = function (BaseModel) {
  return BaseModel
    .extend({
      objectName: 'pledge'
    })
    .belongsTo('Donor')
    .belongsTo('Payment');
};