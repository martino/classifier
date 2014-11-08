'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:AddentitymodalCtrl
 * @description
 * # AddentitymodalCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('AddentitymodalCtrl', function ($scope, $modalInstance, entities, datatxt) {
    if (entities !== undefined){
      $scope.entities = entities.map(function (e) {
        e.topic.weight = 5;
        return e
      });
    }
    $scope.max = 10;
    //$scope.selected = {
    //item: $scope.items[0]
    //};

    $scope.getEntities = function(val) {
      $scope.loadingEntities = true;
      return datatxt.wikiSearch(val, 10).then(
        function (response){
          $scope.loadingEntities = false;
          return response.entities.map(function (item) {
            return {
              'title': item.title,
              'image': item.image,
              'abstract': item.abstract,
              'uri': item.uri,
              'weight': 10
            };
          })
        }, function () {
          $scope.loadingEntities = false;
          return [];
        }
      );
    };

    $scope.ok = function () {
      if ('entities' in $scope){
        var selectedEntities = $scope.entities
          .filter(function (e) {return e.selected})
          .map(function(e){return e.topic;})

        $modalInstance.close(selectedEntities);
      } else {
        $modalInstance.close($scope.entitySelected);
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
