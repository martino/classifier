'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:CustomModelsListCtrl
 * @description
 * # CustomModelsListCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('CustomModelsListCtrl', ['$scope', 'datatxt','$rootScope', function ($scope, datatxt, $rootScope) {
    $rootScope.page = 'models';
    datatxt.getAllModels().then(function (data) {
      var items = data.items, models = [];

      for(var i=items.length-1; i>=0; i--) {
        console.log(items[i].id)
        models.push(
          {
            'id': items[i].id,
            'name': items[i].data.description,
            'topics': items[i].data.categories.map(function (el) {
              return {
                name: el.name,
                size: Object.keys(el.topics).length
              };
            })
          });
      }
      $scope.models = models;
    });
  }]);
