'use strict';

var internals = {};

module.exports = function (BaseModel, localStorageService, $location, $q) {
  var Campaign = BaseModel
    .extend({
      objectName: 'campaigns'
    });

  internals.cached = function (host) {
    return localStorageService.get('valet-campaign-' + host);
  };

  Campaign.active = function () {
    var cached = internals.cached($location.host());
    if (cached) return $q.when(cached);
    return Campaign.find({
      host: $location.host()
    })
    .then(function (campaign) {
      localStorageService.add('valet-campaign-' + $location.host(), campaign);
      return campaign;
    });
  };

  return Campaign;
};