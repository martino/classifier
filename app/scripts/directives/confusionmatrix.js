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
        scope.topicList = Object.getOwnPropertyNames(scope.matrix);
        scope.relevantEntities = [];
        console.log(scope.matrix)
        scope.topicList.forEach(function(topicA) {
          var topicAKeys = Object.getOwnPropertyNames(scope.matrix[topicA]);
          if (topicAKeys.length) {
            var maxIndex = topicAKeys[0];
            topicAKeys.forEach(function (topicB){
              if (scope.matrix[topicA][topicB].count > scope.matrix[topicA][maxIndex].count)
                maxIndex = topicB;
            });
            scope.matrix[topicA][maxIndex].max = true
          }
        });


        scope.showRelevantEntities = function (entities) {
          scope.relevantEntities = entities;
        }
      }
    };
  });
