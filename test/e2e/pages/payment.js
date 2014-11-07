'use strict';

var Create = exports.Create = function () {

  this.email = element(by.model('donor.email'));
  this.cc = element(by.model('payment.card.number'));
  this.ccExp = {
    month: element(by.model('payment.card.exp_month')),
    year: element(by.model('payment.card.exp_month'))
  };
  this.cvc = element(by.model('payment.card.cvc'));
  this.street1 = element(by.model('payment.address.street1'));
  this.street2 = element(by.model('payment.address.street2'));
  this.zip = element(by.model('payment.address.zip'));

  this.emailError = element(by.id('donor-email-error'));

  this.submit = element(by.tagName('button'));

  this.get = function () {
    return browser.get('/payments/create?pledge=' + this.pledge);
  };

};

Create.prototype.pledge = '9cc59b16-990d-4273-9c45-a8dce25cc5bf';
