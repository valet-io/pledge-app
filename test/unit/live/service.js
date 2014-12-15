'use strict';

module.exports = function () {

  var live;
  beforeEach(angular.mock.inject(function (_live_) {
    live = _live_;
  }));

  it('is initially enabled', function () {
    expect(live.enabled()).to.be.true;
  });

  it('can be disabled', function () {
    expect(live.enabled(false)).to.be.false;
    expect(live.enabled()).to.be.false;
  });

  it('throws with a non-boolean', function () {
    expect(function () {
      live.enabled('true');
    })
    .to.throw('boolean');
  });

};