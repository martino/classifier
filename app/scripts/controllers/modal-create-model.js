'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:ModalCreateModelCtrl
 * @description
 * # ModalCreateModelCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('ModalCreateModelCtrl', function ($scope, $modalInstance) {
    $scope.model = {
      topicKeyentities: true,
      topicLimit: 20,
      name: '',
      description: ''
    };

    $scope.ok = function () {
      $modalInstance.close({
        'modelData': $scope.model
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
