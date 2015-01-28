'use strict';

/**
 * @ngdoc directive
 * @name classifierApp.directive:DocumentGroupCard
 * @description
 * # DocumentGroupCard
 */
angular.module('classifierApp')
  .directive('documentGroupCard', function () {
    return {
      templateUrl: 'views/directive-documentgroupcard.html',
      restrict: 'E',
      scope: {
        documentGroup: '='
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
