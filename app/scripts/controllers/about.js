'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
