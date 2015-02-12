'use strict';

describe('Controller: ModalCreateModelCtrl', function () {

  // load the controller's module
  beforeEach(module('classifierApp'));

  var ModalCreateModelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalCreateModelCtrl = $controller('ModalCreateModelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
