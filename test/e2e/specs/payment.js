'use strict';

var chai           = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

var Payment = require('../pages/payment');

describe('Payment', function () {

  // temporary (angular/protractor#1109)
  this.timeout(60 * 1000);

  describe('Create', function () {

    var payment = new Payment.Create();
    beforeEach(function () {
      return payment.get();
    });

    describe('Email', function () {

      it('accepts a valid email', function () {
        payment.email.sendKeys('bvdrucker@gmail.com');
        expect(payment.email.getAttribute('class')).to.eventually.contain('ng-valid');
        expect(payment.emailError.isDisplayed()).to.eventually.be.false;
      });

      it('rejects an invalid email', function () {
        payment.email.sendKeys('bvd');
        expect(payment.email.getAttribute('class')).to.eventually.contain('ng-invalid');
        payment.cc.click();
        expect(payment.emailError.isDisplayed()).to.eventually.be.true;
        expect(payment.emailError.getText())
          .to.eventually.equal('Please enter a valid email');
      });

      it('is required', function () {
        payment.email.click();
        payment.cc.click();
        expect(payment.email.getAttribute('class')).to.eventually.contain('ng-invalid');
        expect(payment.emailError.isDisplayed()).to.eventually.be.true;
        expect(payment.emailError.getText())
          .to.eventually.equal('Please enter your email');
      });

    });

    describe('Card Number', function () {

      it('accepts a valid card number', function () {
        payment.cc.sendKeys('4242424242424242');
        expect(payment.email.getAttribute('class')).to.eventually.contain('ng-valid');
        expect(payment.emailError.isDisplayed()).to.eventually.be.false;
      });

      it('rejects an invalid card number', function () {
        payment.cc.sendKeys('4242424242424241');
        expect(payment.cc.getAttribute('class')).to.eventually.contain('ng-invalid');
        payment.ccExp.month.click();
        expect(payment.ccError.isDisplayed()).to.eventually.be.true;
        expect(payment.ccError.getText())
          .to.eventually.equal('That card doesn\'t look valid');
      });

      it('is required', function () {
        payment.cc.click();
        payment.ccExp.month.click();
        expect(payment.cc.getAttribute('class')).to.eventually.contain('ng-invalid');
        expect(payment.ccError.isDisplayed()).to.eventually.be.true;
        expect(payment.ccError.getText())
          .to.eventually.equal('Please enter a card number');
      });

    });

    describe('Expiration', function () {

      it('can be any valid future month/year', function () {
        payment.ccExp.month.sendKeys('10');
        payment.ccExp.year.sendKeys('20');
        expect(payment.ccExp.month.getAttribute('class'))
          .to.eventually.contain('ng-valid');
        expect(payment.ccExp.year.getAttribute('class'))
          .to.eventually.contain('ng-valid');
        expect(payment.ccExpError.isDisplayed()).to.eventually.be.false;
      });

      it('cannot be in the past', function () {
        payment.ccExp.month.sendKeys('10');
        payment.ccExp.year.sendKeys('10');
        payment.cvc.click();
        expect(payment.ccExpError.isDisplayed()).to.eventually.be.true;
        expect(payment.ccExpError.getText())
          .to.eventually.equal('Please enter a valid expiration');
      });

      it('displays errors after year is touched', function () {
        payment.ccExp.year.click();
        payment.ccExp.month.click();
        expect(payment.ccExpError.isDisplayed()).to.eventually.be.true;
      });

    });

  });

});
