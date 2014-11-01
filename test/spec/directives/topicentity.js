'use strict';

describe('Directive: topicEntity', function () {

  // load the directive's module
  beforeEach(module('classifierApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<topic-entity></topic-entity>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the topicEntity directive');
  }));
});
