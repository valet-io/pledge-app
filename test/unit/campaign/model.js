'use strict';

var angular = require('angular');

module.exports = function () {

  var campaign, $rootScope;
  beforeEach(angular.mock.inject(function ($injector) {
    var Campaign = $injector.get('Campaign');
    campaign     = new Campaign();
    $rootScope   = $injector.get('$rootScope');
    var ref      = campaign.$ref()
    sinon.stub(campaign, '$ref').returns(ref);
    ref.set({
      aggregates: {
        total: 0,
        count: 0
      },
      options: {
        starting_value: 0
      }
    });
    campaign.$subscribe(['aggregates', 'options'], true);
  }));

  function flush () {
    campaign.$ref().flush();
    $rootScope.$digest();
  }

  describe('total', function () {

    it('defaults to 0', function () {
      expect(campaign.total).to.equal(0);
    });

    it('can subscribe to remote updates', function () {
      campaign.$ref().child('aggregates/total').set(100);
      flush();
      expect(campaign.total).to.equal(100);
      campaign.$ref().child('options/starting_value').set(100);
      flush();
      expect(campaign.total).to.equal(200);
    });

  });

  describe('count', function () {

    it('defaults to 0', function () {
      expect(campaign.total).to.equal(0);
    });

    it('can subscribe to remote updates', function () {
      campaign.$ref().child('aggregates/count').set(10);
      flush();
      expect(campaign.count).to.equal(10);
    });

  });

};
