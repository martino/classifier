'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:ModalDocumentUploadCtrl
 * @description
 * # ModalDocumentUploadCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('ModalDocumentUploadCtrl', function ($scope, $modalInstance) {
    $scope.urlError = false;

    $scope.ok = function () {
      console.log($scope.uploadForm.urlFiled.$valid);
      if ($scope.uploadForm.urlFiled.$valid) {
        if ($scope.fileUrl) {
          $modalInstance.close({
            'url': $scope.fileUrl
          });
        } else {
          $scope.urlError = true;
          $scope.urlErrorMessage = 'empty';
        }
      } else {
        $scope.urlError = true;
        $scope.urlErrorMessage = 'invalid';
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
  );
