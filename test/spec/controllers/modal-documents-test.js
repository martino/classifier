'use strict';

describe('Controller: ModalDocumentsTestCtrl', function () {

  // load the controller's module
  beforeEach(module('classifierApp'));

  var ModalDocumentsTestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalDocumentsTestCtrl = $controller('ModalDocumentsTestCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
