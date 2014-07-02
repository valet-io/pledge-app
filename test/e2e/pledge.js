'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

var PledgePage = function () {
  this.inputs = {
    name: element(by.model('pledge.donor.name')),
    phone: element(by.model('pledge.donor.phone')),
    amount: element(by.model('pledge.amount'))
  };

  this.submit = element(by.tagName('button'));

  this.get = function () {
    return browser.get('http://localhost:8000/campaigns/fc3e0e0a-008d-481b-92f1-1563956b98ae/pledge');
  };
};

describe('Pledge', function () {

  var pledge;
  beforeEach(function () {
    pledge = new PledgePage();
    return pledge.get();
  });

  it('is disabled until until it has valid info', function () {
    expect(pledge.submit.isEnabled()).to.eventually.be.false;
    pledge.inputs.name.sendKeys('Ben Drucker');
    pledge.inputs.phone.sendKeys('9739856070');
    pledge.inputs.amount.sendKeys('100');
    expect(pledge.submit.isEnabled()).to.eventually.be.true;
  });

});
