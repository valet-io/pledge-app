// 'use strict';

// var angular = require('angular');

// describe('Campaign: Controller', function () {

//   var $controller, scope;
//   beforeEach(angular.mock.module(require('../../../src')));
//   beforeEach(angular.mock.inject(function ($injector) {
//     scope       = $injector.get('$rootScope').$new();
//     $controller = $injector.get('$controller');
//   }));

//   it('publishes the campaign on the scope', function () {
//     var campaign = {
//       listen: sinon.spy()
//     };
//     $controller('CampaignController', {
//       $scope: scope,
//       campaign: campaign
//     });
//     expect(scope).to.have.property('campaign', campaign);
//   });

//   it('listens to firebase and publishes a promise on the scope', function () {
//     var promise = {};
//     var campaign = {
//       listen: sinon.stub().returns(promise)
//     };
//     $controller('CampaignController', {
//       $scope: scope,
//       campaign: campaign
//     });
//     expect(scope).to.have.property('firebase', promise);
//     expect(campaign.listen).to.have.been.called;
//   })

// });
