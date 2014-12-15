'use strict';

module.exports = function () {
  var enabled = true;
  return {
    enabled: function (setting) {
      if (arguments.length) {
        if (typeof setting !== 'boolean') throw new Error('"live" must be a boolean');
        return (enabled = setting);
      }
      else {
        return enabled;
      }
    }
  };
};