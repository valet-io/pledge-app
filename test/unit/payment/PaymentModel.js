var angular = require('angular');

describe('Payment: Model', function () {

  var Payment, Stripe, $timeout, $q;
  beforeEach(angular.mock.module(require('../../../app')));
  beforeEach(angular.mock.inject(function ($injector) {
    Payment = $injector.get('Payment');
    Stripe = $injector.get('Stripe');
    $timeout = $injector.get('$timeout');
    $q = $injector.get('$q');
  }));

  var payment;
  beforeEach(function () {
    payment = new Payment();
  });

  describe('#token', function () {

    it('creates a token and assigns it to the payment', function () {
      var token = {
        id: 'tokenid'
      };
      sinon.stub(Stripe.card, 'createToken').returns($q.when(token));
      payment.card = {};
      payment.createToken().then(function (payment) {
        expect(payment).to.have.property('token', 'tokenid');
      });
      $timeout.flush();
    });

  });

});
