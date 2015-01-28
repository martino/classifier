'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:DocumentGroupDetailCtrl
 * @description
 * # DocumentGroupDetailCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('DocumentGroupDetailCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'datatxt', function ($rootScope, $scope, $location, $routeParams, datatxt) {
    $rootScope.page = 'documents';

    datatxt.getDocumentDetails($routeParams.docId).then(function (data) {
      $scope.documentGroup = data
    });
  }]
);
