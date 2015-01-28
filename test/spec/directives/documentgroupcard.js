'use strict';

describe('Directive: DocumentGroupCard', function () {

  // load the directive's module
  beforeEach(module('classifierApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-document-group-card></-document-group-card>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the DocumentGroupCard directive');
  }));
});
