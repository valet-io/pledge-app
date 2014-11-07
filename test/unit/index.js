'use strict';

beforeEach(angular.mock.module(require('../../')));
beforeEach(angular.mock.module(function ($provide) {
  $provide.value('Firebase', require('mockfirebase').MockFirebase);
}));

describe('Pledge', require('./pledge'));
