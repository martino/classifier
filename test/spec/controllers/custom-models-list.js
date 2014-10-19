'use strict';

describe('Controller: CustomModelsListCtrl', function () {

  // load the controller's module
  beforeEach(module('classifierApp'));

  var CustomModelsListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomModelsListCtrl = $controller('CustomModelsListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
