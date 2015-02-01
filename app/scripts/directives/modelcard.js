'use strict';

/**
 * @ngdoc directive
 * @name classifierApp.directive:ModelCard
 * @description
 * # ModelCard
 */
angular.module('classifierApp')
  .directive('modelCard', function () {
    return {
      templateUrl: 'views/directive-modelcard.html',
      restrict: 'E',
      scope: {
        model: '='
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
