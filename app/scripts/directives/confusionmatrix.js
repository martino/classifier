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
        scope.topicCount = {};

        scope.$watch('matrix', function(newMatrix) {
          if (newMatrix) {
            var topicCount = {};
            scope.relevantEntities = [];
            scope.topicList.forEach(function(topicA) {
              var topicAKeys = Object.getOwnPropertyNames(newMatrix[topicA]);
              var totalCount = 0;
              if (topicAKeys.length) {
                var maxIndex = topicAKeys[0];
                topicAKeys.forEach(function (topicB){
                  totalCount += newMatrix[topicA][topicB].count;
                  if (newMatrix[topicA][topicB].count > newMatrix[topicA][maxIndex].count)
                    maxIndex = topicB;
                });
                newMatrix[topicA][maxIndex].max = true;
              }
              topicCount[topicA] = totalCount;
            });
            scope.matrix = newMatrix;
            scope.topicCount = topicCount;
          }
        }, true);

        scope.getTopicName = function (etopic) {
          var result = etopic.split('/');
          result = result[result.length-1];
          return decodeURIComponent(result).replace(/_/g, ' ');
        };

        scope.displayValue = function (total, value) {
          var retValue = (value * 100)/total;
          if (retValue < 1)
            return retValue.toFixed(1);
          return parseInt(retValue);
        };

        scope.showRelevantEntities = function (entities) {
            var allEntities = [], keys = Object.getOwnPropertyNames(entities);
            keys.forEach(function (key) {
              allEntities.push({'entity': key, 'count': entities[key]})
            });
            scope.relevantEntities = allEntities;
          }
        }
    };
  });
