module.exports = function (valetBaseModel) {
  var Campaign = valetBaseModel.extend({
    objectName: 'campaigns'
  });
  return Campaign;
};