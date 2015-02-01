'use strict';

/**
 * @ngdoc directive
 * @name classifierApp.directive:DocumentGroupCard
 * @description
 * # DocumentGroupCard
 */
angular.module('classifierApp')
  .directive('documentGroupCard', ['datatxt', function (datatxt) {
    return {
      templateUrl: 'views/directive-documentgroupcard.html',
      restrict: 'E',
      scope: {
        documentGroup: '='
      },
      link: function (scope, element, attrs, ngModel) {

        scope.showNewDGForm = false;
        scope.newModel = {
          name: ''
        };
        scope.createDocumentGroup = function () {
          console.log('create', scope.newModel);
          if (scope.newModel.name !== '')
            datatxt.createNewDocumentGroup(scope.newModel.name);
        };
        scope.toggleForm = function () {
          scope.showNewDGForm = !scope.showNewDGForm;
        };
      }
    };
  }]);
