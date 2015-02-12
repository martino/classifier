'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:CustomModelsListCtrl
 * @description
 * # CustomModelsListCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('CustomModelsListCtrl', ['$scope', 'datatxt','$rootScope','$modal', function ($scope, datatxt, $rootScope, $modal) {
    $rootScope.page = 'models';
    $scope.elaborationInProcess = false;

    $scope.createModel = function () {
      var createModelModal = $modal.open({
        templateUrl: 'views/modal-create-model.html',
        controller: 'ModalCreateModelCtrl',
        resolve: {
        }
      });

      createModelModal.result.then(function (data) {
        $scope.elaborationInProcess = true;
        datatxt.modelsCreate(data.modelData).then(function () {
          updateModels();
          $scope.elaborationInProcess = false;
        }, function () {
          $scope.elaborationInProcess = false;
        });
      });
    };
    var updateModels = function () {
      datatxt.getAllModels().then(function (data) {
        var items = data, models = [];

        for (var i = items.length - 1; i >= 0; i--) {
          models.push(
            {
              'id': items[i].id,
              'description': items[i].data.description,
              'name': items[i].name,
              'lastTest': {
                f1: items[i]['last_test']['f1'] || '-',
                precision: items[i]['last_test']['precision'] || '-',
                recall: items[i]['last_test']['recall'] || '-'
              },
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
    };

    updateModels();
  }]);
