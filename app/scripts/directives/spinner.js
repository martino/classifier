'use strict';

/**
 * @ngdoc directive
 * @name classifierApp.directive:spinner
 * @description
 * # spinner
 */
angular.module('classifierApp')
  .directive('spinner', function () {
    return {
      templateUrl: 'views/directive-spinner.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
