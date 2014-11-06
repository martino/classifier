'use strict';

describe('Controller: AddentitymodalCtrl', function () {

  // load the controller's module
  beforeEach(module('classifierApp'));

  var AddentitymodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddentitymodalCtrl = $controller('AddentitymodalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
