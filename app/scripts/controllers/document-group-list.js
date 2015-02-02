'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:DocumentGroupListCtrl
 * @description
 * # DocumentGroupListCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('DocumentGroupListCtrl', ['$rootScope', '$scope', 'datatxt', function ($rootScope, $scope, datatxt) {
    $rootScope.page = 'documents';
    $scope.getDocuments = function () {
      datatxt.getDocumentGroups().then(function (data) {
        $scope.documentGroups = data;
      })
    };
    $scope.getDocuments();

    $scope.$on('updateDocumentGroups', function () {
      $scope.getDocuments();
    })
  }]
);
