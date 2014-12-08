'use strict';

exports.main = function () {
  return {
    restrict: 'EA',
    controller: EditableController,
    transclude: true,
    scope: {
      value: '=',
      onSave: '&'
    }
  };
};

function EditableController ($scope, $element, $transclude) {
  var display, field;
  this.setDisplay = function (d) {
    display = d;
    display.on('click', this.edit);
  };
  this.setField = function (f) {
    field = f;
    field.addClass('ng-hide');
    field.find('editable-save').on('click', this.save);
  };
  this.edit = function () {
    display.addClass('ng-hide');
    field.removeClass('ng-hide');
    field.find('input')[0].focus();
  };
  this.save = function () {
    field.addClass('ng-hide');
    display.removeClass('ng-hide');
    $scope.onSave({
      value: s.edited
    });
  };
  var s;
  $transclude(function (clone, scope) {
    s = scope;
    scope.edited = $scope.value;
    $element.append(clone);
  });
}
EditableController.$inject = ['$scope', '$element', '$transclude'];

exports.display = function () {
  return {
    restrict: 'EA',
    require: '^editable',
    link: function (scope, element, attributes, editableController) {
      editableController.setDisplay(element);
    }
  };
};


exports.field = function () {
  return {
    restrict: 'EA',
    require: '^editable',
    link: function (scope, element, attributes, editableController) {
      editableController.setField(element);
    }
  };
};
