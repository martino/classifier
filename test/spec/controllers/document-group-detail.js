'use strict';

describe('Controller: DocumentGroupDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('classifierApp'));

  var DocumentGroupDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DocumentGroupDetailCtrl = $controller('DocumentGroupDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
