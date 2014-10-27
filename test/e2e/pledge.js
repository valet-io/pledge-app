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
    return browser.get('/pledges/create?campaign=fc3e0e0a-008d-481b-92f1-1563956b98ae');
  };
};

describe('Pledge Form', function () {

  var pledge;
  beforeEach(function () {
    this.timeout(10000);
    pledge = new PledgePage();
    return pledge.get();
  });

  describe('Name', function () {

    var name, error;
    beforeEach(function () {
      name = pledge.inputs.name;
      error = $('.error');
    });

    it('accepts a full name', function () {
      name.sendKeys('Ben Drucker');
      pledge.inputs.phone.click();
      expect(name.getAttribute('class')).to.eventually.contain('ng-valid');
    });

    it('rejects a first name only', function () {
      name.sendKeys('Ben');
      pledge.inputs.phone.click();
      expect(name.getAttribute('class')).to.eventually.contain('ng-invalid-full-name');
    });

    it('is required', function () {
      name.click();
      pledge.inputs.phone.click();
      expect(name.getAttribute('class')).to.eventually.contain('ng-invalid-required');
    });

  });

});
