'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:ScoredetailsmodalCtrl
 * @description
 * # ScoredetailsmodalCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('ScoredetailsmodalCtrl', function ($scope, $modalInstance, topic, scoreDetails, currentModel) {
    $scope.topic = topic;
    $scope.scoreDetails = scoreDetails;
    $scope.currentModel = currentModel;
    $scope.getTopicName = function (etopic) {
      var result = etopic.split('/');
      result = result[result.length-1];
      return decodeURIComponent(result).replace(/_/g, ' ');
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
