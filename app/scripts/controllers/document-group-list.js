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
    datatxt.getDocumentGroups().then(function (data) {
      $scope.documentGroups = data;
    })
  }]
);
