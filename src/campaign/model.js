'use strict';

module.exports = function (BaseModel) {
  return BaseModel
    .extend({
      objectName: 'campaigns'
    });
};
