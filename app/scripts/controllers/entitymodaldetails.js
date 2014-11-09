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
      var topicSplitted = etopic.split('/');
      return topicSplitted[topicSplitted.length-1];
    };

    $scope.entity = entity;

    $scope.ok = function () {
      $modalInstance.close({});
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
