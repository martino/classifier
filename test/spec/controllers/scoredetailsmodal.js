'use strict';

describe('Controller: ScoredetailsmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('classifierApp'));

  var ScoredetailsmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScoredetailsmodalCtrl = $controller('ScoredetailsmodalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
