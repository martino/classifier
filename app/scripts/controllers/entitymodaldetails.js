'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:EntitymodaldetailsCtrl
 * @description
 * # EntitymodaldetailsCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('EntitymodaldetailsCtrl', function ($scope, $modalInstance, entity) {
    $scope.getTopicName = function (etopic) {
      var result = etopic.split('/');
      result = result[result.length-1];
      return decodeURIComponent(result).replace(/_/g, ' ');

    };

    $scope.entity = entity;

    $scope.ok = function () {
      $modalInstance.close({});
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
