'use strict';

/**
 * @ngdoc directive
 * @name classifierApp.directive:smallEntity
 * @description
 * # smallEntity
 */
angular.module('classifierApp')
  .directive('smallEntity', function () {
    return {
      templateUrl: 'views/directive-smallentity.html',
      restrict: 'E',
      scope: {
        entity: '=',
        maxrating: '='
      },
      link: function postLink(scope, element, attrs) {

      }
    };
  });
