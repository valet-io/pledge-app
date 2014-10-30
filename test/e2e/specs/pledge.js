'use strict';

var chai           = require('chai');
var chaiAsPromised = require('chai-as-promised');
var url            = require('url');

chai.use(chaiAsPromised);
var expect = chai.expect;

var Pledge = require('../pages/pledge');

describe('Pledge', function () {

  // temporary (angular/protractor#1109)
  this.timeout(60 * 1000);

  describe('Creation Form', function () {

    var pledge = new Pledge.Create();
    beforeEach(function () {
      return pledge.get();
    });

    describe('Name', function () {

      it('accepts a full name', function () {
        pledge.name.sendKeys('Ben Drucker');
        expect(pledge.name.getAttribute('class')).to.eventually.contain('ng-valid');
        expect(pledge.nameError.isDisplayed()).to.eventually.be.false;
      });

      it('rejects a first name only', function () {
        pledge.name.sendKeys('Ben');
        expect(pledge.name.getAttribute('class')).to.eventually.contain('ng-invalid-full-name');
        expect(pledge.nameError.isDisplayed()).to.eventually.be.false;
        pledge.phone.click()
        expect(pledge.nameError.isDisplayed()).to.eventually.be.true;
        expect(pledge.nameError.getText()).to.eventually.include('full name');
      });

      it('is required', function () {
        pledge.name.click();
        pledge.phone.click();
        expect(pledge.nameError.isDisplayed()).to.eventually.be.true;
      });

    });

    describe('Phone', function () {

      function assertValid () {
        expect(pledge.phone.getAttribute('class')).to.eventually.contain('ng-valid');
      }

      it('accepts a plain number', function () {
        pledge.phone.sendKeys('9739856070');
        assertValid();
      });

      it('accepts a dash delimeted number', function () {
        pledge.phone.sendKeys('973-985-6070');
        assertValid();
      });

      it('accepts a dot delimeted number', function () {
        pledge.phone.sendKeys('973.985.6070');
        assertValid();
      });

      it('accepts parentheses in the area code', function () {
        pledge.phone.sendKeys('(973) 985-6070');
        assertValid();
      });

      it('is required', function () {
        pledge.phone.click();
        pledge.name.click();
        expect(pledge.phoneError.isDisplayed()).to.eventually.be.true;
        expect(pledge.phoneError.getText()).to.eventually.include('enter a phone number');
      });

    });

    describe('Amount', function () {

      it('can be any positive number', function () {
        pledge.amount.sendKeys(1);
        expect(pledge.amount.getAttribute('class')).to.eventually.contain('ng-valid');
      });

      it('cannot be zero', function () {
        pledge.amount.sendKeys(0);
        expect(pledge.amount.getAttribute('class')).to.eventually.contain('ng-invalid');
        expect(pledge.amountError.getText()).to.eventually.contain('less than');
      });

      it('must be a number', function () {
        pledge.amount.sendKeys('a');
        expect(pledge.amount.getAttribute('class')).to.eventually.contain('ng-invalid');
      });

      it('displays errors whenever the field is dirty', function () {
        pledge.amount.sendKeys(0);
        expect(pledge.amountError.isDisplayed()).to.eventually.be.true;
      });

      it('displays errors when the field becomes unfocused', function () {
        pledge.amount.click();
        expect(pledge.amountError.isDisplayed()).to.eventually.not.be.true;
        pledge.phone.click();
        expect(pledge.amountError.isDisplayed()).to.eventually.be.true;
      });

    });

    describe('Submission', function () {

      function fill () {
        pledge.name.sendKeys('Ben Drucker');
        pledge.phone.sendKeys('9739856070');
        pledge.amount.sendKeys('100');
      }

      it('cannot be submitted until valid', function () {
        expect(pledge.submit.isEnabled()).to.eventually.be.false;
        fill();
        expect(pledge.submit.isEnabled()).to.eventually.be.true;
      });

      it('transitions to the pledge confirmation page', function () {
        browser.ignoreSynchronization = true;
        fill();
        pledge.submit.click();
        browser.wait(function () {
          return browser.getCurrentUrl()
            .then(function (uri) {
              var parts = url.parse(uri).path.split('/');
              return parts[1] === 'pledges' && parts[2].length === 36;
            });
        });
      });

    });

  });

});
