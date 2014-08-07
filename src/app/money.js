'use strict';

module.exports = function () {
  return function (amount) {
    if (typeof amount !== 'number') return amount;
    return '$' + amount;
  };
};
