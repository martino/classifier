'use strict';

describe('Controller: ModalDocumentUploadCtrl', function () {

  // load the controller's module
  beforeEach(module('classifierApp'));

  var ModalDocumentUploadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalDocumentUploadCtrl = $controller('ModalDocumentUploadCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
