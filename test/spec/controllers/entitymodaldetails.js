'use strict';

describe('Controller: EntitymodaldetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('classifierApp'));

  var EntitymodaldetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EntitymodaldetailsCtrl = $controller('EntitymodaldetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
