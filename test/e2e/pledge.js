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
    browser.get('http://localhost:8000/#/pledge');
  };
}

describe('Pledge', function () {

  var pledge;
  beforeEach(function () {
    pledge = new PledgePage();
    return pledge.get();
  });

  it('can accept a pledge', function () {
    expect(pledge.submit.isEnabled()).to.eventually.be.false;
    pledge.inputs.name.sendKeys('Ben');
    pledge.inputs.phone.sendKeys('9739856070');
    pledge.inputs.amount.sendKeys('100');
    expect(pledge.submit.isEnabled()).to.eventually.be.true;
  });

});
