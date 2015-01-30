'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:ModalDocumentsTestCtrl
 * @description
 * # ModalDocumentsTestCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('ModalDocumentsTestCtrl', function ($scope, $modalInstance, classifiers) {
    $scope.data = classifiers;

    $scope.ok = function () {
      $modalInstance.close({'modelId': $scope.selectedModel});
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
