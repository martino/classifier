'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:DocumentGroupDetailCtrl
 * @description
 * # DocumentGroupDetailCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('DocumentGroupDetailCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'datatxt', '$modal', '$timeout', function ($rootScope, $scope, $location, $routeParams, datatxt, $modal, $timeout) {
    $rootScope.page = 'documents';
    $scope.runningTest = null;


    $scope.checkStatus = function () {
      datatxt.testingStatus($scope.documentGroup.testing_task_id).then(function (data) {
        if (data.task.result == null) {
          $timeout($scope.checkStatus, 5000);
        } else {
          $scope.documentGroup.testing_task_id = null;
        }
      })
    };


    $scope.launchTest = function () {
      datatxt.getAllModels().then(function (data) {
        var items = data, models = [];

        for(var i=items.length-1; i>=0; i--) {
          models.push(
            {
              'id': items[i].id,
              'name': items[i].name
            });
        }


        var testsModal = $modal.open({
          templateUrl: 'views/modal-documents-test.html',
          controller: 'ModalDocumentsTestCtrl',
          resolve: {
            classifiers: function () {
              return models;
            }
          }
        });

        testsModal.result.then(function (data) {
          datatxt.testDocumentGroup($scope.documentGroup.id, data.modelId, data.threshold).then(function (data) {
            $scope.documentGroup.testing_task_id = data.task;
            $scope.checkStatus();
          });

        })
      })
    };

    datatxt.getDocumentDetails($routeParams.docId).then(function (data) {
      $scope.documentGroup = data;
      $scope.runningTest = null;
    });

    datatxt.getDocumentGroupsEvaluations($routeParams.docId).then(function (data) {
      $scope.documentGroupEvaluations = data;
    })
  }]
);
