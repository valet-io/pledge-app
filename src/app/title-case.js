'use strict';

var title = require('title-case');

module.exports = function () {
  return function (string) {
    return string ? title(string) : string;
  };
};
