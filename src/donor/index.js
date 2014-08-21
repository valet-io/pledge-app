'use strict';

require('angular')
  .module('DonorModule', [
    'convex'
  ])
  .factory('Donor', [
    'ConvexModel',
    require('./model')
  ]);

module.exports = 'DonorModule';
