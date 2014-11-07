'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:AddentitymodalCtrl
 * @description
 * # AddentitymodalCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('AddentitymodalCtrl', function ($scope, $modalInstance, entity, datatxt) {
    $scope.entity = entity;
    //$scope.selected = {
    //item: $scope.items[0]
    //};


    $scope.getEntities = function(val) {
      $scope.loadingEntities = true;
      return datatxt.wikiSearch(val, 10).then(
        function (response){
          $scope.loadingEntities = false;
          return response.entities.map(function (item) {
            var image = item.image || {};
            return {
              'name': item.title,
              'image': image.thumbnail,
              'abstract': item.abstract,
              'url': item.uri
            };
          })
        }, function () {
          $scope.loadingEntities = false;
          return [];
        }
      );
    };

    $scope.ok = function () {
      $modalInstance.close($scope.entitySelected);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
