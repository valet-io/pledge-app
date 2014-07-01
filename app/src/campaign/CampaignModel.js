'use strict';

var internals = {};

module.exports = function (BaseModel) {
  var Campaign = BaseModel
    .extend({
      objectName: 'campaigns'
    });

  return Campaign;
};
