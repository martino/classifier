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
          $scope.updateDocumentGroupEvaluations();
        }
      })
    };

    $scope.checkImportStatus = function () {
      datatxt.testingStatus($scope.documentGroup.importing_task_id).then(function (data) {
        if (data.task.result == null) {
          $timeout($scope.checkImportStatus, 5000);
        } else {
          $scope.documentGroup.importing_task_id = null;
          $scope.updateDocumentGroupDetails();
        }
      })
    };

    $scope.uploadFile = function () {
      var uploadModal = $modal.open({
        templateUrl: 'views/modal-document-upload.html',
        controller: 'ModalDocumentUploadCtrl',
        resolve: {}
      });

      uploadModal.result.then(function (data) {
        datatxt.uploadDocuments($routeParams.docId, data.url).then(function (data) {
          $scope.documentGroup.importing_task_id = data.task;
          $scope.checkImportStatus();
        })
      });
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
        });
      })
    };

    $scope.updateDocumentGroupDetails = function () {
      datatxt.getDocumentDetails($routeParams.docId).then(function (data) {
        $scope.documentGroup = data;
        if ($scope.documentGroup.importing_task_id === '')
          $scope.documentGroup.importing_task_id = null;
        if ($scope.documentGroup.testing_task_id === '')
          $scope.documentGroup.testing_task_id = null;
        $scope.runningTest = null;
      });
    };

    $scope.updateDocumentGroupEvaluations = function () {
      datatxt.getDocumentGroupsEvaluations($routeParams.docId).then(function (data) {
        $scope.documentGroupEvaluations = data;
      });
    };

    $scope.updateDocumentGroupDetails();
    $scope.updateDocumentGroupEvaluations();
  }]
);
