'use strict';

module.exports = function (syncLoaded) {
  syncLoaded(this);
};

module.exports.$inject = ['syncLoaded'];
