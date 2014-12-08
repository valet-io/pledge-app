'use strict';

var angular = require('angular');

module.exports = function () {

  describe('#$active', function () {

    it('sets the campaign as "active" on the constructor', angular.mock.inject(function (Campaign) {
      var campaign = new Campaign();
      expect(campaign.$active()).to.equal(campaign);
      expect(Campaign.active).to.equal(campaign);
    }));

  });

};
