// 'use strict';

// var angular = require('angular');

// describe('Campaign: Routes', function () {

//   var Campaign, $state, $resolve, $timeout;
//   beforeEach(angular.mock.module(require('../../../src')));
//   // beforeEach(angular.mock.module(function ($provide) {
//   //   Campaign = sinon.spy();
//   //   $provide.factory('Campaign', function () {
//   //     return Campaign;
//   //   });
//   // }));
//   beforeEach(angular.mock.inject(function ($injector) {
//     $state   = $injector.get('$state');
//     $resolve = $injector.get('$resolve');
//     $timeout = $injector.get('$timeout');
//   }));
//   beforeEach(angular.mock.inject(function ($injector) {
//     var $q = $injector.get('$q');
//     Campaign = sinon.spy();
//     Campaign.prototype.fetch = sinon.spy(function () {
//       return $q.when(this);
//     });
//     Campaign.prototype.listen = sinon.spy(function () {
//       return $q.when(this);
//     });
//   }));

//   describe('Resolving the campaign to child states', function () {

//     var campaign, resolves;
//     beforeEach(function () {
//       $resolve.resolve($state.get('campaign').resolve, {
//         Campaign: Campaign,
//         $stateParams: {
//           id: 0
//         }
//       })
//       .then(function (_resolves_) {
//         resolves = _resolves_;
//       });
//       $timeout.flush();
//       campaign = Campaign.firstCall.returnValue;
//     });

//     it('uses the campaign ID from the URL', function () {
//       expect(Campaign).to.have.been.calledWithMatch({id: 0});
//     });

//     it('fetches the campaign', function () {
//       expect(campaign.fetch).to.have.been.called;
//     });

//     it('resolves the campaign as "campaign"', function () {
//       expect(resolves).to.have.property('campaign', campaign);
//     });

//   });

// });
