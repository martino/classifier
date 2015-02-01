'use strict';

describe('Directive: ModelCard', function () {

  // load the directive's module
  beforeEach(module('classifierApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-model-card></-model-card>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ModelCard directive');
  }));
});
