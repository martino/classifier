'use strict';

/**
 * @ngdoc directive
 * @name classifierApp.directive:ConfusionMatrix
 * @description
 * # ConfusionMatrix
 */
angular.module('classifierApp')
  .directive('confusionMatrix', function () {
    return {
      templateUrl: 'views/directive-confusionmatrix.html',
      restrict: 'E',
      scope: {
        matrix: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.topicList = Object.keys(scope.matrix);
      }
    };
  });
