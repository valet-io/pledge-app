var Create = exports.Create = function () {

  this.name = element(by.model('pledge.donor.name'));
  this.phone = element(by.model('pledge.donor.phone'));
  this.amount = element(by.model('pledge.amount'));

  this.nameError = element(by.id('pledge-name-error'));
  this.phoneError = element(by.id('pledge-phone-error'));
  this.amountError = element(by.id('pledge-amount-error'));

  this.submit = element(by.tagName('button'));

  this.get = function (test) {
    return browser.get('/pledges/create?campaign=' + this.campaign + '&test=' + ~~test);
  };

};

Create.prototype.campaign = 'fc3e0e0a-008d-481b-92f1-1563956b98ae';
