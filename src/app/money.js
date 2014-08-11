'use strict';

var numeral = require('numeral');

module.exports = function () {
  return function (amount) {
    if (typeof amount !== 'number') return amount;
    return numeral(amount).format('$0,0');
  };
};
