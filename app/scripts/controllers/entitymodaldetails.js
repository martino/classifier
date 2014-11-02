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
    console.log('test')
    $scope.entity = entity;
    //$scope.selected = {
      //item: $scope.items[0]
    //};

    $scope.ok = function () {
      //$modalInstance.close($scope.selected.item);
      $modalInstance.close({});
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
